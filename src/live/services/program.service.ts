import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Program } from '../schema/program.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from "log4js";
import { PageInfoInterface } from "../../core";
import { Log4j } from "../../common";
import { ProgramUpdateDto } from "../dto/program.dto";

@Injectable()
@Log4j
export class ProgramService {
  constructor(@InjectModel(Program.name) private readonly programModel: Model<Program>) {}
  private logger: Logger;
  async save(program: Program): Promise<boolean> {
    const createProgram = new this.programModel(program);
    const channelResult = await createProgram.save();
    this.logger.debug('[saveProgram] createProgram = ', createProgram);
    if (channelResult.name) {
      this.logger.info('[channelSave] msg = ', '频道新增成功');
      return true;
    }
    this.logger.warn('[saveChannel] msg = ', '频道新增失败');
    return false;
  }

  async find(pageNumber: number, pageSize: number): Promise<PageInfoInterface> {
    const findResult = await Promise.all([
      this.programModel
        .find({})
        .where({
          isDeleted: 0,
        })
        .skip(pageNumber * pageSize)
        .limit(pageNumber)
        .sort({
          updateTime: -1,
        })
        .exec(),
      this.programModel.countDocuments({}),
    ]);
    return {
      list: findResult[0],
      total: findResult[1],
      current: pageNumber,
      size: pageSize,
    };
  }

  async update(programUpdateDto: ProgramUpdateDto) {
    const updateResult = await this.programModel.findByIdAndUpdate(
      {
        _id: programUpdateDto._id,
      },
      {
        $set: programUpdateDto,
      },
    );
    if (updateResult.name) {
      this.logger.info('[saveUser] msg = ', '节目单更新成功');
      return true;
    }
    this.logger.warn('[saveUser] msg = ', '节目单更新失败');
    return false;
  }

  async delete(channelId: string): Promise<any> {
    const deleteResult = await this.programModel.findByIdAndUpdate(
      {
        _id: channelId,
      },
      {
        $set: {
          isDeleted: 1,
        },
      },
    );
    if (deleteResult.name) {
      this.logger.info('[deleteUser] msg=', '删除节目单成功');
      return true;
    }
    return false;
  }
}
