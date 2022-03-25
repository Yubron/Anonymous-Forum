import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReplyRepository } from './reply.repository';
import { CreateReplyDto } from './dtos/create-reply.dto';
import * as bcrypt from 'bcryptjs';
import { DeleteReplyDto } from './dtos/delete-reply.dto';
import { UpdateReplyDto } from './dtos/update-reply.dto';

@Injectable()
export class ReplyService {
  constructor(private readonly replyRepository: ReplyRepository) {}
    getAll(boardId: number, page: number) {
      try {
        return this.replyRepository.getAll(boardId, page)
      } catch(e) {

      }
      
    }

    async createReply(createReplyDto: CreateReplyDto) {
      try {

        const hashedPassword = await this.passwordEncryption(createReplyDto);
        createReplyDto.password = hashedPassword;

        await this.replyRepository.createReply(createReplyDto);
      } catch(e) {
        throw e
      }
    }

    async checkPassword(id: number, password: string) {
      try {
        const targetReply = (await this.replyRepository.getOneIncludePassword(id))[0]
        if(!targetReply) {
          throw new Error('does not exist')
        }
        if(await this.passwordCompare({plain: password, encrypt: targetReply.password})) {
          return true
        } else {
          throw new Error('password is wrong !')
        }
      } catch(e) {  
        throw e
      }
    }

    updateReply(id: number, updateReplyDto: UpdateReplyDto) {
      try {
        this.replyRepository.updateReply(id, updateReplyDto)
      } catch(e) {

      }
    }

    async deleteReply(id: number, deleteReplyDto: DeleteReplyDto) {
      try {
        const { password } = deleteReplyDto
        if(await this.checkPassword(id, password)) {
          this.replyRepository.deleteReply(id)
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
