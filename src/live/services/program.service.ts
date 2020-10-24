import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Program } from '../schema/program.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from 'log4js';
import { PageInfoInterface } from '../../core';
import { BaseException, Log4j } from '../../common';
import { ProgramCreateDto, ProgramUpdateDto } from '../dto/program.dto';
import { ProgramError } from '../errorCode/program.error';

@Injectable()
@Log4j
export class ProgramService {
  constructor(@InjectModel(Program.name) private readonly programModel: Model<Program>) {}
  private logger: Logger;
  async save(program: ProgramCreateDto): Promise<any> {
    const createProgram = new this.programModel(program);
    const channelResult = await createProgram.save();
    this.logger.debug('[save] createProgram -> ', createProgram);
    if (!channelResult.name) {
      this.logger.info('[save] msg -> ', '节目单新增失败');
      throw new BaseException(ProgramError.PROGRAM_ADD_FAIL);
    }
    return {
      message: '新增节目单成功',
    };
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
        _id: programUpdateDto.id,
      },
      {
        $set: programUpdateDto,
      },
    );
    if (!updateResult.name) {
      this.logger.warn('[update] msg ->', '节目单更新失败');
      throw new BaseException(ProgramError.PROGRAM_UPDATE_FAIL);
    }
    return {
      message: '新增节目单成功',
    };
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
    if (!deleteResult.name) {
      this.logger.warn('[delete] msg ->', '删除节目单失败');
      throw new BaseException(ProgramError.PROGRAM_DELETED_FAIL);
    }
    return {
      message: '删除节目单成功',
    };
  }
}
