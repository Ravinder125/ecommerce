import { DecodedIdToken } from "firebase-admin/auth";
import { RegisterUserRequestBody } from "./types.ts";

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            firebaseUser?: DecodedIdToken;
            user?: RegisterUserRequestBody
        }
    }
}