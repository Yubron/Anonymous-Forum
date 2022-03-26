import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordRepository } from 'src/keyword/repositories/keyword.repository';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { ReplyController } from './reply.controller';
import { ReplyRepository } from './reply.repository';
import { ReplyService } from './reply.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository, ReplyRepository, KeywordRepository])],
  controllers: [BoardController, ReplyController],
  providers: [BoardService, ReplyService]
})
export class BoardModule {}
