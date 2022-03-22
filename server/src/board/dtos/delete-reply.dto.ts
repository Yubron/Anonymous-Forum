import { IsNotEmpty } from "class-validator";

export class DeleteReplyDto {
  @IsNotEmpty()
  password: string
}