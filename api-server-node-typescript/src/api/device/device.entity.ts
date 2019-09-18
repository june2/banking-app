import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Utilization } from './../utilization/utilization.entity';

@Entity()
export class Device {
  
  constructor(deviceId: number, deviceName: string) {
    this.device_id = deviceId;
    this.device_name = deviceName;
  }

  @PrimaryGeneratedColumn()
  device_id: number;

  @Column()
  device_name: string;

  @OneToMany(type => Utilization, utilizations => utilizations.device)
  utilizations: Utilization[]
}
