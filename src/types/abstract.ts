export type AbstractStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'REVISION_REQUIRED'
export interface AbstractAuthor { name: string; email: string; organization: string; role: string }
export interface AbstractSubmission { id: string; userId: string; conferenceId: string; title: string; abstract: string; keywords: string[]; authors: AbstractAuthor[]; status: AbstractStatus; submittedAt: string; reviewerComments?: string }
