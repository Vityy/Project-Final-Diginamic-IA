// src/types/reservation.ts
export type Reservation = {
  id: string
  user: string
  roomId: string
  resourceId?: string
  date: string // ISO date
  startTime: string // HH:mm
  endTime: string // HH:mm
  status: 'Confirmed' | 'Pending' | 'Cancelled'
}
