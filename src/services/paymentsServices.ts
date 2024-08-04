import { AppDataSource } from "../config/connection";
import { CreatePaymentDTO } from "../dto/createPayment.dto";
import { Client } from "../entities/client";
import { Installment } from "../entities/Installment";
import { InstallmentStatus } from "../entities/InstallmentStatus";
import { LoanStatus } from "../entities/loanStatus";
import { Payment } from "../entities/payment";

export const createPaymentService = async (paymentData: CreatePaymentDTO) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const paymentRepository = AppDataSource.getRepository(Payment);
  const installmentRepository = AppDataSource.getRepository(Installment);
  const loanStatusRepository = AppDataSource.getRepository(LoanStatus);
  const installmentStatusRepository = AppDataSource.getRepository(InstallmentStatus);

  // Encontrar al cliente
  const client = await clientRepository.findOneBy({ document: paymentData.document });
  if (!client) {
    throw new Error('Client not found');
  }

  // Encontrar el estado del préstamo
  const loanStatus = await loanStatusRepository.findOneBy({ id: paymentData.loanStatusId });
  if (!loanStatus) {
    throw new Error('Loan status not found');
  }

  // Crear el pago
  const payment = paymentRepository.create({
    client: client,
    loanStatus: loanStatus,
    amount: paymentData.amount,
    date: paymentData.date,
  });

  const savedPayment = await paymentRepository.save(payment);

  // Crear cuotas
  for (const installmentData of paymentData.installments) {
    const installmentStatus = await installmentStatusRepository.findOneBy({ id: installmentData.installmentStatusId });
    if (!installmentStatus) {
      throw new Error('Installment status not found');
    }

    const installment = installmentRepository.create({
      payment: savedPayment,
      amount: installmentData.amount,
      dueDate: installmentData.dueDate,
      installmentStatus: installmentStatus,
    });

    await installmentRepository.save(installment);
  }

  return savedPayment;
};