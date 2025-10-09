import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { hashPassword as customHashPassword, verifyPassword } from './auth/password.util';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude() // Exclude password from being returned in responses
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Method to hash password before saving
  async hashPassword(): Promise<void> {
    this.password = await customHashPassword(this.password);
  }

  // Method to validate password
  async validatePassword(plainPassword: string): Promise<boolean> {
    return await verifyPassword(plainPassword, this.password);
  }
}