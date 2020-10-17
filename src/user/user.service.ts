import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { Log4j } from '../common';
import { Logger } from 'log4js';
import { PageInfoInterface } from '../core/interfaces/page-info.interface';
import { User } from './schema/user.schema';
import * as uuid from 'uuid';
@Injectable()
@Log4j
export class UserService {
  private logger: Logger;
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async save(user: UserCreateDto): Promise<boolean> {
    user.userId = 'userId_' + uuid.v4();
    const createUserModel = new this.userModel(user);
    const userResult = await createUserModel.save();
    this.logger.debug('[saveUser] userResult = ', userResult);
    if (userResult.username) {
      this.logger.info('[saveUser] msg = ', '用户新增成功');
      return true;
    }
    this.logger.warn('[saveUser] msg = ', '用户新增失败');
    return false;
  }

  async find(pageNumber: number, pageSize: number): Promise<PageInfoInterface> {
    const findResult = await Promise.all([
      this.userModel
        .find({})
        .where({
          isDeleted:0
        })
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

  async update(user: UserUpdateDto) {
    const updateResult = await this.userModel.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: user,
      },
    );
    if (updateResult.username) {
      this.logger.info('[saveUser] msg = ', '用户更新成功');
      return true;
    }
    this.logger.warn('[saveUser] msg = ', '用户更新失败');
    return false;
  }

  async deleteUser(userId:string):Promise<any>{
    const deleteResult = await this.userModel.findByIdAndUpdate({
      _id: userId
    },{
      $set:{
        isDeleted: 1
      }
    })
    if(deleteResult.username){
        this.logger.info('[deleteUser] msg=','用户删除成功')
        return true
    }
    return false
  }
}