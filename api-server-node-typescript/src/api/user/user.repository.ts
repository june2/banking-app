import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthLoginDto } from './../auth/auth.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmailAndPass(email: string, password: string): Promise<User> {    
    return this.findOne({ email: email, password: password });
  }  
}
