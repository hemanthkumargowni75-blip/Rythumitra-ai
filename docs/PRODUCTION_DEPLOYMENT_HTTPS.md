# RythuMitra AI — Production HTTPS, Security & Database Deployment Guide

## 1. Production HTTPS Architecture

Browser security models strictly mandate a **Secure Context (`https://` or `http://localhost`)** for the following capabilities:
1. **WebRTC Camera (`navigator.mediaDevices.getUserMedia`)**: Rear camera leaf disease scanning and live viewfinder.
2. **Microphone (`SpeechRecognition` & `MediaRecorder`)**: Native browser speech recognition and audio recording.
3. **GPS Geolocation (`navigator.geolocation.getCurrentPosition`)**: Single-shot field coordinates acquisition and reverse geocoding.
4. **Secure Cookies (`rm_session`, `rm_2fa_verified`)**: Requires `Secure; HttpOnly; SameSite=Strict`.

> [!WARNING]
> On an insecure public HTTP domain (`http://`), browsers block camera, microphone, and geolocation APIs with a `SecurityError` or `PermissionDeniedError`. Deployment on a registered domain MUST be provisioned with TLS/SSL.

---

## 2. Nginx Reverse Proxy & TLS Configuration

Place this configuration at `/etc/nginx/sites-available/rythumitra.conf`:

```nginx
# HTTP - Redirect all traffic to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name app.rythumitra.ai www.rythumitra.ai;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS - Production Reverse Proxy
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name app.rythumitra.ai;

    # TLS Certificates (Let's Encrypt / Certbot)
    ssl_certificate /etc/letsencrypt/live/app.rythumitra.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.rythumitra.ai/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/app.rythumitra.ai/chain.pem;

    # SSL Protocols & Cipher Suites (Mozilla Modern Guidelines)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(self), microphone=(self), geolocation=(self)" always;

    # Reverse Proxy to Next.js Daemon
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_cache_bypass $http_upgrade;
        client_max_body_size 16M; # Accommodates maximum 15MB crop leaf images
    }
}
```

---

## 3. Database Separation of Concerns

### PostgreSQL / PostGIS (Relational & Spatial Core)
- **Host**: `DATABASE_URL`
- **Domain Responsibilities**:
  - `farmers`: Registered farmer identities, mobile numbers, preferred languages.
  - `farms`: Relational farm profiles, soil categories, irrigation sources.
  - `farm_boundaries`: PostGIS `GEOMETRY(POLYGON, 4326)` boundaries, spatial area in acres and guntas.
  - `crop_cycles`: Agronomic schedules, sowing dates, harvest milestones.
  - `financial_ledger`: Operational expense and revenue double-entry audit records.

### MongoDB (Document & Unstructured Intelligence)
- **Host**: `MONGODB_URL`
- **Domain Responsibilities**:
  - `ai_conversations`: Multilingual chat logs with agronomy reasoning steps.
  - `crop_image_diagnoses`: AI leaf scan records, bounding boxes, pathogen confidence vectors.
  - `voice_sessions`: Audio transcription audit logs (excluding raw biometric audio).
  - `search_history`: Farmer query debounced frequency and recent searches.
  - `location_sync_audit`: Ministry of Panchayati Raj / LGD synchronization log documents.

---

## 4. Production Security Checklist

1. **No Sensitive Data in Logs**: Passwords, plaintext OTPs, Aadhaar numbers, and raw GPS logs are scrubbed from stdout and server logs.
2. **OTP Hashing**: Server uses salted SHA-256 hashes (`hashOtp(otp, salt)`); no plaintext OTPs are persisted in database or cache.
3. **Session Cookies**: Cookies are flagged `HttpOnly; Secure; SameSite=Strict`.
4. **Rate Limiting**:
   - OTP send: Max 5 requests per hour per mobile number; 60-second resend cooldown.
   - OTP verification: Max 3 attempts before permanent challenge invalidation.
5. **Image Validation**: Max 15MB, Min 500B, dimensions $\ge 50\times 50\text{px}$, strict MIME type enforcement.
