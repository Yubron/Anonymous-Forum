import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Reply } from "./reply.entity";

@Entity({name: 'board'})
export class Board {
  @PrimaryGeneratedColumn({name: 'id', comment: 'PK값'})
  id: number;

  @Column({name: 'title', comment: '제목'})
  title: string;

  @Column({name: 'content', comment: '내용'})
  content: string;

  @Column({name: 'writer', comment: '작성자'})
  writer: string;

  @Column({name: 'password', comment: '비밀번호'})
  password: string;

  @CreateDateColumn({name: 'createDate', comment: '생성날짜'})
  createDate: Date;

  @UpdateDateColumn({name: 'updateDate', comment: '수정날짜'})
  updateDate: Date;

  @OneToMany(type => Reply, reply => reply.boardId)
  replies: Reply[];
}