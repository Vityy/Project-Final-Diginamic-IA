// src/types/auth.ts
export type User = { id: string; email: string }
export type AuthState = { user: User | null; token: string | null }
