import { Keyword } from "src/entities/keyword.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Keyword)
export class KeywordRepository extends Repository<Keyword> {
  findUser(contentKeyword: string[]) {
    return this.query(
      `
        SELECT keyword.userId
        FROM keyword
        WHERE keyword.keyword REGEXP '${contentKeyword.map(item => '^'+item+'$').join('|')}'
      `
    )
  }
}