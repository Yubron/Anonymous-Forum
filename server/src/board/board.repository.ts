import { Board } from "src/entities/board.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateBoardDto } from "./dtos/create-board.dto";
import { UpdateBoardDto } from "./dtos/update-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  getAll(page: number, searchType: string, searchKeyword: string) {
    const offset = 10 * (page-1)
    return this.query(
      `
        SELECT id, title, content, writer, createDate, updateDate 
        FROM board
        ${searchType ? `WHERE ${searchType} LIKE '%${searchKeyword}%'` : ``}
        ORDER BY id desc
        LIMIT ${offset}, 10
      `
    )
  }

  getOneById(id: number) {
    return this.query(
      `
        SELECT id, title, content, writer, createDate, updateDate 
        FROM board
        WHERE id = ${id}    
      `
    )
  }
  
  getOneIncludePassword(id: number) {
    return this.query(
      `
        SELECT *
        FROM board
        WHERE id = ${id}   
      `
    )
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, content, writer, password } = createBoardDto
    return this.query(
      `
        INSERT INTO board
          (title, content, writer, password)
        VALUES
          ('${title}', '${content}', '${writer}', '${password}')
      `
    )
  }

  updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const setList = []
    for (const [key, value] of Object.entries(updateBoardDto)) {
      setList.push(`${key} = '${value}'`)
    }
    
    return this.query(
      `
        UPDATE board
        SET ${setList.join(',')}
        WHERE id = ${id}
      `
    )
  }

  deleteBoard(id: number) {
    return this.query(
      `
        DELETE FROM board
        WHERE id = ${id}     
      `
    )
  }
}
