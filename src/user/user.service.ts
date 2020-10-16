import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto } from './dto/user.dto';
import { Log4j } from '../common';
import { Logger } from 'log4js';
import { PageInfoInterface } from '../core/interfaces/page-info.interface';
import { User } from './interfaces/user.interface';

@Injectable()
@Log4j
export class UserService {
  private logger: Logger;
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async saveUser(user: UserCreateDto): Promise<User> {
    const createUser = new this.userModel(user);
    return createUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByPage(pageNumber: number, pageSize: number): Promise<PageInfoInterface> {
    const findResult = await Promise.all([
      this.userModel
        .find({})
        .skip(pageNumber * pageSize)
        .limit(pageNumber)
        .sort({
          updateTime: -1,
        })
        .exec(),
      this.userModel.countDocuments({}),
    ]);
    return {
      list: findResult[0],
      total: findResult[1],
      current: pageNumber,
      size: pageSize,
    };
  }
}
