import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'keyword'})
export class Keyword {
  @PrimaryGeneratedColumn({name: 'id', comment: 'PK값'})
  id: number;

  @Column({name: 'keyword', comment: '키워드'})
  keyword: string;

  @Column({name: 'userId', comment: '유저ID'})
  userId: string;

  @CreateDateColumn({name: 'createDate', comment: '생성날짜'})
  createDate: Date;

  @UpdateDateColumn({name: 'updateDate', comment: '수정날짜'})
  updateDate: Date;
}