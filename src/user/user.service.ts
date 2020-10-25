import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { BaseException, Log4j } from '../common';
import { Logger } from 'log4js';
import { User } from './schema/user.schema';
import * as uuid from 'uuid';
import { PageInfoInterface } from '../core';
import { UserError } from './errorCode/user.error';

@Injectable()
@Log4j
export class UserService {
  private logger: Logger;
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async save(user: UserCreateDto): Promise<any> {
    user.userId = 'userId_' + uuid.v4();
    const createUserModel = new this.userModel(user);
    const userResult = await createUserModel.save();
    this.logger.debug('[saveUser] userResult -> ', userResult);
    if (!userResult.username) {
      this.logger.warn('[saveUser] msg -> ', '用户新增失败');
      throw new BaseException(UserError.USER_ADD_FAIL);
    }
    return {
      message: '新增用户成功',
    };
  }

  async find(pageNumber: string, pageSize: string): Promise<PageInfoInterface> {
    const pageNumberInt = +pageNumber - 1 <= 0 ? 0 : +pageNumber - 1;
    const pageSizeInt = +pageSize;
    const findResult = await Promise.all([
      this.userModel
        .find({})
        .where({
          isDeleted: 0,
        })
        .skip(pageNumberInt * pageSizeInt)
        .limit(pageNumberInt)
        .sort({
          updateTime: -1,
        })
        .exec(),
      this.userModel.countDocuments({}),
    ]);
    return {
      list: findResult[0],
      total: findResult[1],
      current: pageNumberInt,
      size: pageSizeInt,
    };
  }

  async update(user: UserUpdateDto): Promise<any> {
    const updateResult = await this.userModel.findByIdAndUpdate(
      {
        _id: user.id,
      },
      {
        $set: user,
      },
    );
    if (!updateResult.username) {
      this.logger.warn('[saveUser] msg -> ', '用户更新失败');
      throw new BaseException(UserError.USER_UPDATE_FAIL);
    }
    return {
      message: '更新用户成功',
    };
  }

  async deleteUser(userId: string): Promise<any> {
    const deleteResult = await this.userModel.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          isDeleted: 1,
        },
      },
    );
    if (!deleteResult.username) {
      this.logger.warn('[deleteUser] msg ->', '用户删除成功');
      throw new BaseException(UserError.USER_DELETED_FAIL);
    }
    return {
      message: '删除用户成功',
    };
  }

  async findOne(username: string): Promise<User> {
    if (!username) {
      return null;
    }
    return this.userModel.findOne({
      username: username,
    });
  }
}
