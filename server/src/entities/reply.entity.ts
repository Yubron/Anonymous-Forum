import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Board } from "./board.entity";

@Entity({name: 'reply'})
export class Reply {
  @PrimaryGeneratedColumn({name: 'id', comment: 'PK값'})
  id: number;

  @Column({name: 'content', comment: '내용'})
  content: string;

  @Column({name: 'writer', comment: '작성자'})
  writer: string;

  @Column({name: 'password', comment: '비밀번호'})
  password: string;

  @ManyToOne(() => Board, board => board.id, {onDelete: 'CASCADE'})
  @JoinColumn({ name: "boardId" })
  boardId: number;

  @Column({name: 'parentReplyId', comment: "대댓글일 경우 댓글ID", default: null, nullable: true})
  parentReplyId: number;

  @Column({name: 'isDelete', comment: "삭제 여부", default: false})
  isDelete: boolean

  @CreateDateColumn({name: 'createDate', comment: '생성날짜'})
  createDate: Date;

  @UpdateDateColumn({name: 'updateDate', comment: '수정날짜'})
  updateDate: Date;
}