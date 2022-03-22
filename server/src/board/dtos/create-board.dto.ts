import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBoardDto {

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  readonly title: string

  @IsNotEmpty()
  @IsString()
  readonly content: string

  @IsNotEmpty()
  @IsString()
  readonly writer: string

  @IsNotEmpty()
  password: string

}