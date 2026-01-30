// routes/webhook.ts
import express from "express"
import { Webhook, } from "svix"
// import type { WebhookRequiredHeaders } from "@clerk/nextjs/server"; // or @clerk/clerk-sdk-node
import { User } from '../models/user.models.js'

const router = express.Router()

router.post("/clerk-webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const payload = req.body
    const secret = process.env.CLERK_WEBHOOK_SECRET!

    const wh = new Webhook(secret)


    const headers = {
        "webhook-id": req.headers["webhook-id"] as string,
        "webhook-timestamp": req.headers["webhook-timestamp"] as string,
        "webhook-signature": req.headers["webhook-signature"] as string,
    };

    try {
        const evt = wh.verify(payload, headers) as any

        if (evt.type === "user.created") {
            const { id, email_addresses, unsafe_metadata } = evt.data

            await User.create({
                _id: id,
                email: email_addresses[0].email_address,
                role: unsafe_metadata?.role || "user",
                dob: unsafe_metadata?.dob,
                avatar: unsafe_metadata?.avatar,
            })
            console.log("✅ User created in MongoDB:", email_addresses[0].email_address)
        }

        res.status(200).json({ received: true })
    } catch (err) {
        console.error("Webhook error:", err)
        res.status(400).json({ error: "Invalid webhook" })
    }
})

export default router
