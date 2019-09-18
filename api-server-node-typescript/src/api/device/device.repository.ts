import { EntityRepository, Repository } from 'typeorm';
import { Device } from './device.entity';
import { AuthLoginDto } from '../auth/auth.dto';

@EntityRepository(Device)
export class DeviceRepository extends Repository<Device> {

}
