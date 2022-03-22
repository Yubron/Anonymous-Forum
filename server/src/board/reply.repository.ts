import { Reply } from "src/entities/reply.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateReplyDto } from "./dtos/create-reply.dto";
import { UpdateReplyDto } from "./dtos/update-reply.dto";

@EntityRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  getAll(boardId: number, page: number) {
    // const offset = 10 * (page-1)

    return this.query(
      `
        SELECT id, IF(isDelete, '삭제된 댓글입니다', content) as content, writer, boardId, parentReplyId, isDelete, createDate, updateDate 
        FROM reply
        WHERE boardId = ${boardId}
        ORDER BY IF(ISNULL(parentReplyId), id, parentReplyId), id;
      `
    )
  }
  
  getOneIncludePassword(id: number) {
    return this.query(
      `
        SELECT *
        FROM reply
        WHERE id = ${id}   
      `
    )
  }

  createReply(createReplyDto: CreateReplyDto) {
    const { content, writer, password, boardId, parentReplyId } = createReplyDto
    return this.query(
      `
        INSERT INTO reply
          (content, writer, password, boardId, parentReplyId)
        VALUES
          ('${content}', '${writer}', '${password}', ${boardId}, ${parentReplyId})
      `
    )
  }

  updateReply(id: number, updateReplyDto: UpdateReplyDto) {
    const setList = []
    for (const [key, value] of Object.entries(updateReplyDto)) {
      setList.push(`${key} = '${value}'`)
    }
    
    return this.query(
      `
        UPDATE reply
        SET ${setList.join(',')}
        WHERE id = ${id}
      `
    )
  }

  deleteReply(id: number) {
    return this.query(
      `
        UPDATE reply
        SET isDelete = true
        WHERE id = ${id}
      `
    )
  }
}
