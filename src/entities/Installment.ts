import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Payment } from './payment';
import { InstallmentStatus } from './InstallmentStatus';

@Entity()
export class Installment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Payment, (payment) => payment.installments)
  payment: Payment;

  @ManyToOne(() => InstallmentStatus)
  installmentStatus: InstallmentStatus;

  @Column()
  amount: number;

  @Column()
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
