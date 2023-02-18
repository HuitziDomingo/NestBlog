import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {

  private logger = new Logger('UsersService')


  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      let newUser = this.userRepository.create(createUserDto)
      return await this.userRepository.save(newUser)
    } catch (error) {
      this.handleError(error)
    }
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.find({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepository.delete({ id })
  }


  private handleError(error: any) {
    if (error === '23505')
      throw new BadRequestException(error.dtail)

    this.logger.error(error)

    throw new InternalServerErrorException('Los elementos duplicados en la base de datos no son permitidos')
  }
}
