import { Entity, ObjectId, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn() 
  id!: ObjectId;

  @Column()
  text!: string;
}