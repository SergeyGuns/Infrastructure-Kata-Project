# Password Service Documentation

The PasswordService in the auth-service provides secure password hashing and verification functionality with configurable salt management.

## Features

- Secure password hashing using PBKDF2 algorithm
- Configurable salt via environment variable
- Password verification against hashed passwords
- Default fallback salt value for security

## Configuration

The service uses NestJS ConfigService to manage the salt value:

- Environment variable: `PASSWORD_SALT` (optional)
- Default fallback: `a-very-secure-salt-value-for-password-hashing`

## Usage

The PasswordService provides the following methods:

### `hashPassword(password: string): Promise<string>`

Hashes a password using a random salt (recommended approach).
Returns the salt and hash in the format `salt:hash`.

### `hashPasswordWithEnvSalt(password: string): Promise<string>`

Hashes a password using the salt from environment variables.
Returns the salt and hash in the format `salt:hash`.

### `verifyPassword(password: string, hashedPassword: string): Promise<boolean>`

Verifies a plain text password against a hashed password.
Returns true if the passwords match, false otherwise.

## Security Notes

- The recommended approach is to use `hashPassword()` which generates a random salt for each password
- Using a unique salt per password prevents rainbow table attacks
- The environment variable option allows for configuration across different deployment environments
- The system maintains backward compatibility with existing hashed passwords