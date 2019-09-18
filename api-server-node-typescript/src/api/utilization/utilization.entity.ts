import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Device } from './../device/device.entity';

@Entity()
export class Utilization {

  constructor(id: number, device: Device, year: number, rate: number) {
    this.id = id;
    this.device = device;
    this.year = year;
    this.rate = rate;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Device, device => device.device_id)
  @JoinColumn({ name: 'device_id' })
  device: Device;

  @Column()
  year: number;

  @Column({ nullable: true, type: 'float' })
  rate: number;
}
