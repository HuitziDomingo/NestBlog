import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
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
      return this.handleError(error)
    }
  }


  findAll() {
    return this.userRepository.find()
  }


  async findOne(id: number) {
    let user = await this.userRepository.findOne({ where: { id } })
    if (!user) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }
    return user
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOne({ where: { id } })
    if (!user)
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

    return this.userRepository.update({ id }, updateUserDto)
  }


  async remove(id: number) {
    let user = await this.userRepository.findOne({ where: { id } })
    if (!user)
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)

    return this.userRepository.delete({ id })
  }


  private handleError(error: any) {
    if (error === '23505')
      throw new BadRequestException(error.dtail)

    this.logger.error(error)

    throw new InternalServerErrorException('Los elementos duplicados en la base de datos no son permitidos')
  }


}
