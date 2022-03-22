import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { DeleteBoardDto } from './dtos/delete-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  getAll(@Query("page") page: number, @Query('searchType') searchType: string, @Query('searchKeyword') searchKeyword: string) {
    return this.boardService.getAll(page=1, searchType, searchKeyword)
  }

  @Get('/:id')
  getOneById(@Param("id") id: number) {
    return this.boardService.getOneById(id)
  }

  @Get('/check-password/:id')
  checkPassword(@Param("id") id: number, @Body() body: {password: string}) {
    return this.boardService.checkPassword(id, body)
  }

  @Post('/')
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto)
  }

  @Patch('/:id')
  updateBoard(@Param("id") id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.updateBoard(id, updateBoardDto)
  }

  @Delete('/:id')
  deleteBoard(@Param("id") id: number, @Body() deleteBoardDto: DeleteBoardDto) {
    return this.boardService.deleteBoard(id, deleteBoardDto)
  }
}
