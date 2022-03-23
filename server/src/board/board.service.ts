import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dtos/create-board.dto';
import * as bcrypt from 'bcryptjs';
import { DeleteBoardDto } from './dtos/delete-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly notificationRepository : NotificationRepository
  ) {}
  getAll(page: number, searchType: string, searchKeyword: string) {
    try {
      return this.boardRepository.getAll(page, searchType, searchKeyword)
    } catch(e) {

    }
    
  }

  getOneById(id: number) {
    try {
      return this.boardRepository.getOneById(id)  
    } catch(e) {

    }
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    try {

      const hashedPassword = await this.passwordEncryption(createBoardDto);
      createBoardDto.password = hashedPassword;

      await this.boardRepository.createBoard(createBoardDto);
      
      // title로 notification 받을 유저 목록 찾기
      const userList = await this.notificationRepository.getUserFromContent(createBoardDto.title)
      
    } catch(e) {
      
    }
  }

  async checkPassword(id: number, body: {password: string}) {
    try {
      const targetBoard = (await this.boardRepository.getOneIncludePassword(id))[0]
      if(!targetBoard) {
        throw new Error('does not exist')
      }
      if(await this.passwordCompare({plain: body.password, encrypt: targetBoard.password})) {
        return true
      } else {
        throw new Error('password is wrong !')
      }
    } catch(e) {
      throw e
    }
  }

  updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    try {
      this.boardRepository.updateBoard(id, updateBoardDto)
    } catch(e) {

    }
  }

  deleteBoard(id: number, deleteBoardDto: DeleteBoardDto) {
    try {        
      this.boardRepository.deleteBoard(id)
    } catch(e) {
      
    }
  }

  async passwordEncryption(obj: any) {
    if(obj.hasOwnProperty('password')) {
      const salt = await bcrypt.genSalt();
      const hashedPassword: string = await bcrypt.hash(obj.password, salt);
      return hashedPassword;
    } else {
      throw new Error('password is required !')
    }
  }

  async passwordCompare({plain, encrypt}: {plain: string, encrypt: string}) {
    if(await bcrypt.compare(plain, encrypt)) {
      return true 
    } else {
      return false
    }
  }
}
