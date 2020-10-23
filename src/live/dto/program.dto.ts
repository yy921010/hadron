import { Program } from '../schema/program.schema';

export class ProgramCreateDto extends Program {
  readonly _id: string;
}

export class ProgramUpdateDto extends Program {
  readonly _id: string;
}
