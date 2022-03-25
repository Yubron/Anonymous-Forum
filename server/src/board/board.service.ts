import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dtos/create-board.dto';
import * as bcrypt from 'bcryptjs';
import { DeleteBoardDto } from './dtos/delete-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}
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

        this.boardRepository.createBoard(createBoardDto);
      } catch(e) {
        
      }
    }

    async checkPassword(id: number, password: string) {
      try {
        const targetBoard = (await this.boardRepository.getOneIncludePassword(id))[0]
        if(!targetBoard) {
          throw new Error('does not exist')
        }
        if(await this.passwordCompare({plain: password, encrypt: targetBoard.password})) {
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

    async deleteBoard(id: number, deleteBoardDto: DeleteBoardDto) {
      try {
        const { password } = deleteBoardDto
        if(await this.checkPassword(id, password)) {
          this.boardRepository.deleteBoard(id)
        }
      } catch(e) {
        throw e
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
