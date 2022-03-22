import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dtos/create-reply.dto';
import { DeleteReplyDto } from './dtos/delete-reply.dto';
import { UpdateReplyDto } from './dtos/update-reply.dto';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get('/:boardId')
  getAll(@Param("boardId") boardId: number, @Body("page") page: number) {
    return this.replyService.getAll(boardId, page)
  }

  @Get('/check-password/:id')
  checkPassword(@Param("id") id: number, @Body("password") password: string) {
    return this.replyService.checkPassword(id, password)
  }

  @Post('/')
  createReply(@Body() createReplyDto: CreateReplyDto) {
    return this.replyService.createReply(createReplyDto)
  }

  @Patch('/:id')
  updateReply(@Param("id") id: number, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.updateReply(id, updateReplyDto)
  }

  @Delete('/:id')
  deleteReply(@Param("id") id: number, @Body() deleteReplyDto: DeleteReplyDto) {
    return this.replyService.deleteReply(id, deleteReplyDto)
  }
}
