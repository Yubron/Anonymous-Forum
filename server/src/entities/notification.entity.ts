import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'notification'})
export class Notification {
  @PrimaryGeneratedColumn({name: 'id', comment: 'PK값'})
  id: number;

  @Column({name: 'user', comment: '유저'})
  user: string;

  @Column({name: 'keyword', comment: '알림받고 싶은 keyword'})
  keyword: string;
  
  @Column({name: 'isRead', comment: '읽음 여부', default: false})
  isRead: boolean
}