import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from "./user";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  capital: number;

  @Column()
  interest: number;

  @Column()
  months: number;

  @Column()
  datePayment: Date;

  @Column()
  totalPayment: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.payments)
  userId: User;
}
