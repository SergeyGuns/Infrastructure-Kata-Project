import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class RsaService implements OnModuleInit {
  private privateKey: string;
  private publicKey: string;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    await this.loadOrGenerateKeys();
  }

  private async loadOrGenerateKeys() {
    const keysPath = this.configService.get('RSA_KEYS_PATH') || './keys';
    const privateKeyPath = path.join(keysPath, 'private-key.pem');
    const publicKeyPath = path.join(keysPath, 'public-key.pem');

    // Ensure the keys directory exists
    if (!fs.existsSync(keysPath)) {
      fs.mkdirSync(keysPath, { recursive: true });
    }

    // Check if keys already exist
    if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath)) {
      this.privateKey = fs.readFileSync(privateKeyPath, 'utf8');
      this.publicKey = fs.readFileSync(publicKeyPath, 'utf8');
      console.log('RSA keys loaded from files');
    } else {
      // Generate new RSA key pair
      await this.generateRsaKeyPair();
      
      // Save keys to files
      fs.writeFileSync(privateKeyPath, this.privateKey);
      fs.writeFileSync(publicKeyPath, this.publicKey);
      console.log('New RSA keys generated and saved to files');
    }
  }

  private async generateRsaKeyPair(): Promise<void> {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });

    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  getPrivateKey(): string {
    return this.privateKey;
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  /**
   * Sign data using the private key
   */
  sign(data: string): string {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(data);
    sign.end();
    return sign.sign(this.privateKey, 'base64');
  }

  /**
   * Verify signature using the public key
   */
  verify(data: string, signature: string): boolean {
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update(data);
    verify.end();
    return verify.verify(this.publicKey, signature, 'base64');
  }
}