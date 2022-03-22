import { IsNotEmpty } from "class-validator";

export class DeleteBoardDto {
  @IsNotEmpty()
  password: string
}