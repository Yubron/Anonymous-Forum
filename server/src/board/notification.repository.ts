import { Notification } from "src/entities/notification.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
  getUserFromContent(content: string) {
    let keywordList = content.split(' ').map(item => {
      return ('\'' + item + '\'')
    }).join(',')
    
    return this.query(
      `
        SELECT user
        FROM notification
        WHERE keyword in (${keywordList})
      `
    )
  }
}