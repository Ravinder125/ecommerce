import admin from "firebase-admin"
import { firebaseEnv } from "./env.js"

admin.initializeApp({

    credential: admin.credential.cert(firebaseEnv)

})

export default admin