import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating new user with email: ${createUserDto.email}`);
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    this.logger.log(`User created successfully with id: ${savedUser.id}`);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Finding all users');
    const users = await this.usersRepository.find();
    this.logger.log(`Found ${users.length} users`);
    return users;
  }

  async findOne(id: number): Promise<User> {
    this.logger.log(`Finding user with id: ${id}`);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.warn(`User with id ${id} not found`);
    } else {
      this.logger.log(`User with id ${id} found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    this.logger.log(`Finding user with email: ${email}`);
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.warn(`User with email ${email} not found`);
    } else {
      this.logger.log(`User with email ${email} found`);
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing user with id: ${id}`);
    await this.usersRepository.delete(id);
    this.logger.log(`User with id ${id} removed successfully`);
  }
}
