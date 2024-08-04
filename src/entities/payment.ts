import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./client";
import { LoanStatus } from "./loanStatus";
import { Installment } from "./Installment";

@Entity()
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.loans)
  client: Client;

  @ManyToOne(() => LoanStatus)
  loanStatus: LoanStatus;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @OneToMany(() => Installment, (installment) => installment.payment)
  installments: Installment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
