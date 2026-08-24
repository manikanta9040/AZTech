export type RegistrationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED'
export interface Registration { id: string; conferenceId: string; userId: string; registrationType: string; amount: number; paymentStatus: PaymentStatus; status: RegistrationStatus; registeredAt: string }
