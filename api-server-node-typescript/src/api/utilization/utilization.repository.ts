import { EntityRepository, Repository } from 'typeorm';
import { Utilization } from './utilization.entity';

@EntityRepository(Utilization)
export class UtilizationRepository extends Repository<Utilization> {

}
