import { Program } from '../schema/program.schema';
import { Picture, PictureSchema } from '../schema/picture.schema';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class ProgramCreateDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly subName: string;
  @IsString()
  readonly channelId: string;
  @IsNumber()
  readonly startTime: number;
  @IsNumber()
  readonly endTime: number;
  @IsString()
  readonly introduce: string;
  @IsNumber()
  readonly subNum: number;
  @IsNumber()
  readonly season: number;
  @IsArray()
  readonly genres: number[];
  @IsNumber()
  readonly ratingId: number;
  //关联vod id
  @IsString()
  readonly externalIds: string;
  @ValidateNested()
  readonly pictures: Picture[];
}

export class ProgramUpdateDto extends Program {
  @IsString()
  readonly id: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly subName: string;
  @IsString()
  readonly channelId: string;
  @IsNumber()
  readonly startTime: number;
  @IsNumber()
  readonly endTime: number;
  @IsString()
  readonly introduce: string;
  @IsNumber()
  readonly subNum: number;
  @IsNumber()
  readonly season: number;
  @IsArray()
  readonly genres: number[];
  @IsNumber()
  readonly ratingId: number;
  //关联vod id
  @IsString()
  readonly externalIds: string;
  @ValidateNested()
  readonly pictures: Picture[];
}
