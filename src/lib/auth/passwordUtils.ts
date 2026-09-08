import crypto from 'crypto';

/**
 * Strong Password Hashing Utilities using Node.js native crypto.scrypt
 * OWASP-compliant memory-hard key derivation function.
 * Parameters: N=16384, r=8, p=1, keylen=64 bytes
 */

const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;
const KEY_LEN = 64;
const SALT_BYTES = 32;

export interface HashResult {
  hashString: string;
}

/**
 * Hash password with a fresh cryptographically random 32-byte salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_BYTES).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, KEY_LEN, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
    maxmem: 32 * 1024 * 1024,
  });
  return `scrypt$${SCRYPT_N}$${SCRYPT_R}$${SCRYPT_P}$${salt}$${derivedKey.toString('hex')}`;
}

/**
 * Verify a candidate password against an existing scrypt hash using constant-time comparison
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split('$');
    if (parts.length !== 6 || parts[0] !== 'scrypt') {
      return false;
    }

    const n = parseInt(parts[1], 10);
    const r = parseInt(parts[2], 10);
    const p = parseInt(parts[3], 10);
    const salt = parts[4];
    const originalHash = parts[5];

    const derivedKey = crypto.scryptSync(password, salt, KEY_LEN, {
      N: n,
      r: r,
      p: p,
      maxmem: 32 * 1024 * 1024,
    });

    const bufA = Buffer.from(derivedKey.toString('hex'), 'hex');
    const bufB = Buffer.from(originalHash, 'hex');

    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Validate password complexity:
 * Minimum 8 characters, must contain at least one letter and at least one number
 */
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required.' };
  }
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long.' };
  }
  if (password.length > 128) {
    return { valid: false, error: 'Password cannot exceed 128 characters.' };
  }
  if (!/[A-Za-z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number.' };
  }
  return { valid: true };
}

/**
 * Remove any sensitive security hashes/secrets before returning user objects to clients
 */
export function sanitizeUser<T extends Record<string, any>>(user: T): Omit<T, 'password_hash' | 'salt'> {
  const sanitized = { ...user };
  delete sanitized.password_hash;
  delete sanitized.salt;
  return sanitized;
}
