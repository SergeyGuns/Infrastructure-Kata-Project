import * as crypto from 'crypto';




export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  // Split the stored hash to get the salt and the hash
  const [salt, storedHash] = hashedPassword.split(':');
  
  // Create a new hash using the provided password and the stored salt
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  
  // Compare the newly created hash with the stored hash
  return hash === storedHash;
}

export function hashPassword(password: string): string {
  // Generate a random salt
  const salt = crypto.randomBytes(16).toString('hex');
  
  // Create a hash using the password and the salt
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  
  // Return the salt and hash concatenated with a colon
  return `${salt}:${hash}`;
}