export type UserRole = 'USER' | 'ADMIN'
export interface User { id: string; name: string; email: string; role: UserRole }
export interface MockUser extends User { password: string }
export interface LoginCredentials { email: string; password: string }
export interface RegisterData { name: string; email: string; password: string; confirmPassword: string }
export interface ResetPasswordData { password: string; confirmPassword: string }
export interface AuthState { user: User | null; isAuthenticated: boolean; isLoading: boolean }
export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<User>
  register: (data: RegisterData) => Promise<User>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (data: ResetPasswordData) => Promise<void>
}
