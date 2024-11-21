// types/express.d.ts
import { Request } from 'express';

interface Feedback {
    requestID: string;
    status?: string;
    message?: string | null;
    data?: object;
    error?: object;
    timestamp?: number;
}

declare module 'express-serve-static-core' {
    export interface Request {
        id: string;
        feedback?: Feedback;
    }
}