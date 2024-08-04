export interface CreatePaymentDTO {
  document: number;
  loanStatusId: string;
  amount: number;
  date: Date;
  installments: {
    amount: number;
    dueDate: Date;
    installmentStatusId: string; // Id del estado de la cuota
  }[];
}
