import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReplyDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @IsString()
  readonly content: string

  @IsNotEmpty()
  @IsString()
  readonly writer: string

  @IsNumber()
  readonly boardId: number

  @IsOptional()
  readonly parentReplyId: null | number

  @IsNotEmpty()
  password: string
}