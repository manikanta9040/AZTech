export interface ApiResponse<T> { data: T; message?: string }
export interface PaginatedResponse<T> { content: T[]; page: number; size: number; totalElements: number }
