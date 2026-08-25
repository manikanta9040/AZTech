export type RegistrationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED'
export interface Registration {
  id: string
  conferenceId: string
  userId: string
  participantName?: string
  participantEmail?: string
  conferenceTitle?: string
  organization?: string
  registrationType: string
  amount: number
  paymentStatus: PaymentStatus
  status: RegistrationStatus
  registeredAt: string
  ticketCode?: string
}
