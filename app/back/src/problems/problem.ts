import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ProblemId } from '.';

export class Problem {
  @IsUUID()
  id: ProblemId;

  @IsString()
  @IsOptional()
  caption?: string;

  @IsString()
  math: string;
}
