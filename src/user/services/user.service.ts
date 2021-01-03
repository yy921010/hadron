import { Injectable } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from '../dto/user.dto';
import { BaseException, getLogger } from '../../common';
import { Logger } from 'log4js';
import { User } from '../schema/user.schema';
import * as uuid from 'uuid';
import { PageInfoInterface } from '../../core';
import { HelperService } from '../../share/helper.service';
import { UserInfo } from '../interfaces/user.interface';
import { UserDao } from './user.dao';
import { UserError } from "../errorCode/user.error";
@Injectable()
export class UserService {
  private logger: Logger = getLogger(UserService.name);
  constructor(private readonly userDao: UserDao, private readonly helperService: HelperService) {}

  async save(user: UserCreateDto): Promise<any> {
    const result = await this.userDao.saveUser({
      id: uuid.v4(),
      userId: 'userId_' + uuid.v4(),
      password: this.helperService.cryptoMd5(user.password + user.userId),
      accountNonLocked: 0,
      authType: user.authType,
      avatar: user.avatar,
      isAdmin: 1,
      credentialsNonExpired: 0,
      mail: user.mail,
      mailCode: user.mailCode,
      username: user.username,
      nickName: user.nickName,
      clientLimit: user.clientLimit,
      ageLevel: user.ageLevel,
      deleted: 0,
      pin: user.pin,
      enable: 1,
    });
    if (!result) {
      this.logger.warn('[saveUser] msg -> ', '用户新增失败');
      throw new BaseException(UserError.USER_ADD_FAIL);
    }
    return {
      message: '新增用户成功',
    };
  }

  async find(pageNumber: string, pageSize: string): Promise<PageInfoInterface> {
    const pageNumberInt = !pageNumber ? 0 : +pageNumber - 1;
    const pageSizeInt = +pageSize || 10;
    const pageOffset = pageNumberInt * pageSizeInt;
    const { users, count } = await this.userDao.getUserByPage(pageOffset, pageSizeInt);
    return {
      list: users,
      total: count,
      current: pageNumberInt,
      size: pageSizeInt,
    };
  }

  async update(user: UserUpdateDto): Promise<any> {
    // const updateResult = await this.userModel.findByIdAndUpdate(
    //   {
    //     _id: user.id,
    //   },
    //   {
    //     $set: user,
    //   },
    // );
    // if (!updateResult.username) {
    //   this.logger.warn('[saveUser] msg -> ', '用户更新失败');
    //   throw new BaseException(UserError.USER_UPDATE_FAIL);
    // }
    return {
      message: '更新用户成功',
    };
  }

  async deleteUser(userId: string): Promise<any> {
    // const deleteResult = await this.userModel.findByIdAndUpdate(
    //   {
    //     _id: userId,
    //   },
    //   {
    //     $set: {
    //       isDeleted: 1,
    //     },
    //   },
    // );
    // if (!deleteResult.username) {
    //   this.logger.warn('[deleteUser] msg ->', '用户删除成功');
    //   throw new BaseException(UserError.USER_DELETED_FAIL);
    // }
    return {
      message: '删除用户成功',
    };
  }

  async findOne(username: string): Promise<User> {
    if (!username) {
      return null;
    }
    return null;
  }

  async getUserInfo(username: string): Promise<UserInfo> {
    const userInfo = await this.findOne(username);
    return {
      username: userInfo.username,
      ageLevel: userInfo.ageLevel,
      avatar: userInfo.avatar,
      nickName: userInfo.nickName,
      mail: userInfo.mail,
    };
  }
}
