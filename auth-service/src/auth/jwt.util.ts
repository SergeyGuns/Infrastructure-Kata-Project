import * as crypto from 'crypto';

export function signRSA(payload: { [key: string]: any }, privateKey: string, options: { expiresIn?: string | number } = {}): string {
  // Create the header with the algorithm
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  // Encode header and payload
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify({
    ...payload,
    // Add expiration if specified
    ...(options.expiresIn && { exp: getExpirationTime(options.expiresIn) })
  }));

  // Create the signing input
  const signingInput = `${encodedHeader}.${encodedPayload}`;

  // Sign the input using RSA with SHA-256
  const signature = crypto
    .createSign('RSA-SHA256')
    .update(signingInput)
    .sign(privateKey, 'base64');

  // Return the complete JWT
  return `${signingInput}.${base64UrlEncode(signature)}`;
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function getExpirationTime(expiresIn: string | number): number {
  if (typeof expiresIn === 'number') {
    return Math.floor(Date.now() / 1000) + expiresIn;
  }

  // Parse time format like '1h', '2d', '30m', etc.
  const timeValue = parseInt(expiresIn);
  const timeUnit = expiresIn.slice(-1);
  
  let seconds: number;
  switch (timeUnit) {
    case 's': seconds = timeValue; break;
    case 'm': seconds = timeValue * 60; break;
    case 'h': seconds = timeValue * 60 * 60; break;
    case 'd': seconds = timeValue * 24 * 60 * 60; break;
    default: seconds = timeValue; break;
  }
  
  return Math.floor(Date.now() / 1000) + seconds;
}