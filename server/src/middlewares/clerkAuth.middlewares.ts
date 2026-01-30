// src/middleware/auth.ts
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Request, Response, NextFunction } from "express"

export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = (req as any).auth // Clerk attaches `auth` to req
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        // ✅ Attach userId to req for downstream handlers
        ; (req as any).userId = userId
        next()
    } catch (error) {
        console.error("Auth middleware error:", error)
        return res.status(401).json({ message: "Invalid or missing token" })
    }
})
