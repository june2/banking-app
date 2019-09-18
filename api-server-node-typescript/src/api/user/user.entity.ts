import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  email: string;
  
  @Exclude()
  @Column({ select: false, readonly: true })
  password: string;

  @Column()
  name: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
}
