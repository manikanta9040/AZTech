export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'PayPal' | 'Wire Transfer' | 'Stripe' | 'UPI'
export type AdminPaymentStatus = 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED'

export interface Payment {
  id: string
  transactionId: string
  participantName: string
  participantEmail: string
  conferenceId: string
  conferenceTitle: string
  registrationId?: string
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  status: AdminPaymentStatus
  date: string
  invoiceNumber?: string
}
