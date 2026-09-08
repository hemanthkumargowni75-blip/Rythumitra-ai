/**
 * Production SMS OTP Provider Architecture
 * 
 * SMSProvider
 * ├── MSG91Provider
 * ├── Fast2SMSProvider
 * ├── TwilioProvider
 * └── UnconfiguredSMSProvider
 * 
 * Credentials and API keys remain strictly server-side.
 */

export interface SMSDeliveryResult {
  success: boolean;
  provider: string;
  messageId?: string;
  error?: string;
  unconfigured?: boolean;
}

export interface ISMSProvider {
  name: string;
  isConfigured(): boolean;
  sendOtp(phone: string, otp: string, templateId?: string): Promise<SMSDeliveryResult>;
}

/**
 * 1. MSG91 Provider (India's leading enterprise SMS gateway)
 */
export class MSG91Provider implements ISMSProvider {
  public name = 'MSG91';
  private authKey: string;
  private senderId: string;
  private templateId: string;
  private apiUrl: string;

  constructor() {
    this.authKey = process.env.SMS_PROVIDER_API_KEY || '';
    this.senderId = process.env.SMS_SENDER_ID || 'RYTHUM';
    this.templateId = process.env.SMS_TEMPLATE_ID || '';
    this.apiUrl = process.env.SMS_PROVIDER_URL || 'https://api.msg91.com/api/v5/otp';
  }

  public isConfigured(): boolean {
    return !!(this.authKey && this.authKey.trim().length > 0);
  }

  public async sendOtp(phone: string, otp: string, templateId?: string): Promise<SMSDeliveryResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        provider: this.name,
        unconfigured: true,
        error: 'Real SMS OTP is not configured. Configure the SMS provider before production deployment.',
      };
    }

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

      const tId = templateId || this.templateId;
      const url = new URL(this.apiUrl);
      url.searchParams.append('template_id', tId);
      url.searchParams.append('mobile', formattedPhone);
      url.searchParams.append('authkey', this.authKey);
      url.searchParams.append('otp', otp);

      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok && data.type === 'success') {
        return {
          success: true,
          provider: this.name,
          messageId: data.message || `msg91-${Date.now()}`,
        };
      }

      return {
        success: false,
        provider: this.name,
        error: data.message || 'MSG91 OTP delivery failed',
      };
    } catch (err: any) {
      return {
        success: false,
        provider: this.name,
        error: err.message || 'Network error connecting to MSG91 gateway',
      };
    }
  }
}

/**
 * 2. Fast2SMS Provider (Cost-effective Indian SMS Gateway)
 */
export class Fast2SMSProvider implements ISMSProvider {
  public name = 'Fast2SMS';
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.SMS_PROVIDER_API_KEY || '';
    this.apiUrl = process.env.SMS_PROVIDER_URL || 'https://www.fast2sms.com/dev/bulkV2';
  }

  public isConfigured(): boolean {
    return !!(this.apiKey && this.apiKey.trim().length > 0);
  }

  public async sendOtp(phone: string, otp: string): Promise<SMSDeliveryResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        provider: this.name,
        unconfigured: true,
        error: 'Real SMS OTP is not configured. Configure the SMS provider before production deployment.',
      };
    }

    try {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          authorization: this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variables_values: otp,
          route: 'otp',
          numbers: cleanPhone,
        }),
      });

      const data = await response.json();
      if (response.ok && data.return === true) {
        return {
          success: true,
          provider: this.name,
          messageId: data.request_id || `f2s-${Date.now()}`,
        };
      }

      return {
        success: false,
        provider: this.name,
        error: data.message?.[0] || 'Fast2SMS OTP delivery failed',
      };
    } catch (err: any) {
      return {
        success: false,
        provider: this.name,
        error: err.message || 'Network error connecting to Fast2SMS gateway',
      };
    }
  }
}

/**
 * 3. Twilio Provider (Global Carrier Network)
 */
export class TwilioProvider implements ISMSProvider {
  public name = 'Twilio';
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || process.env.SMS_SENDER_ID || '';
    this.authToken = process.env.SMS_PROVIDER_API_KEY || '';
    this.fromNumber = process.env.TWILIO_FROM_NUMBER || '';
  }

  public isConfigured(): boolean {
    return !!(this.accountSid && this.authToken && this.fromNumber);
  }

  public async sendOtp(phone: string, otp: string): Promise<SMSDeliveryResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        provider: this.name,
        unconfigured: true,
        error: 'Real SMS OTP is not configured. Configure the SMS provider before production deployment.',
      };
    }

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+91${cleanPhone.slice(-10)}`;

      const auth = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');
      const url = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}/Messages.json`;

      const params = new URLSearchParams();
      params.append('To', formattedPhone);
      params.append('From', this.fromNumber);
      params.append('Body', `Your RythuMitra AI login verification code is ${otp}. Valid for 5 minutes. Do NOT share with anyone.`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await response.json();
      if (response.ok && data.sid) {
        return {
          success: true,
          provider: this.name,
          messageId: data.sid,
        };
      }

      return {
        success: false,
        provider: this.name,
        error: data.message || 'Twilio OTP dispatch failed',
      };
    } catch (err: any) {
      return {
        success: false,
        provider: this.name,
        error: err.message || 'Network error connecting to Twilio gateway',
      };
    }
  }
}

/**
 * 4. 2Factor Provider (Indian SMS OTP Gateway - 2Factor.in)
 */
export class TwoFactorProvider implements ISMSProvider {
  public name = '2Factor';
  private apiKey: string;
  private templateName: string;

  constructor() {
    this.apiKey = process.env.TWOFACTOR_API_KEY || (process.env.SMS_PROVIDER?.toLowerCase() === '2factor' ? process.env.SMS_PROVIDER_API_KEY || '' : '');
    this.templateName = process.env.TWOFACTOR_TEMPLATE_NAME || '';
  }

  public isConfigured(): boolean {
    return !!(this.apiKey && this.apiKey.trim().length > 0);
  }

  public async sendOtp(phone: string, otp: string, templateId?: string): Promise<SMSDeliveryResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        provider: this.name,
        unconfigured: true,
        error: 'OTP service is temporarily unavailable. Please try again later.',
      };
    }

    try {
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);
      const template = templateId || this.templateName;
      const url = template
        ? `https://2factor.in/API/V1/${encodeURIComponent(this.apiKey)}/SMS/${encodeURIComponent(cleanPhone)}/${encodeURIComponent(otp)}/${encodeURIComponent(template)}`
        : `https://2factor.in/API/V1/${encodeURIComponent(this.apiKey)}/SMS/${encodeURIComponent(cleanPhone)}/${encodeURIComponent(otp)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok && (data.Status === 'Success' || data.status === 'success')) {
        return {
          success: true,
          provider: this.name,
          messageId: data.Details || `2f-${Date.now()}`,
        };
      }

      return {
        success: false,
        provider: this.name,
        error: data.Details || data.message || '2Factor SMS delivery failed',
      };
    } catch (err: any) {
      return {
        success: false,
        provider: this.name,
        error: err.message || 'Network error connecting to 2Factor.in gateway',
      };
    }
  }
}

/**
 * 5. Unconfigured / Development Provider
 * Clearly informs the administrator and client that external provider is missing.
 */
export class UnconfiguredSMSProvider implements ISMSProvider {
  public name = 'UnconfiguredSMSProvider';

  public isConfigured(): boolean {
    return false;
  }

  public async sendOtp(): Promise<SMSDeliveryResult> {
    return {
      success: false,
      provider: this.name,
      unconfigured: true,
      error: 'OTP service is temporarily unavailable. Please try again later.',
    };
  }
}

/**
 * Factory to get active configured SMS provider based on SMS_PROVIDER env variable
 */
export function getSMSProvider(): ISMSProvider {
  const providerType = (process.env.SMS_PROVIDER || '').toLowerCase().trim();

  switch (providerType) {
    case '2factor':
    case 'twofactor':
      return new TwoFactorProvider();
    case 'msg91':
      return new MSG91Provider();
    case 'fast2sms':
      return new Fast2SMSProvider();
    case 'twilio':
      return new TwilioProvider();
    default:
      // Auto-detect based on configured credentials
      if (process.env.TWOFACTOR_API_KEY) {
        return new TwoFactorProvider();
      }
      if (process.env.SMS_PROVIDER_API_KEY) {
        if (process.env.TWILIO_ACCOUNT_SID) return new TwilioProvider();
        if (process.env.SMS_TEMPLATE_ID) return new MSG91Provider();
        return new Fast2SMSProvider();
      }
      return new UnconfiguredSMSProvider();
  }
}
