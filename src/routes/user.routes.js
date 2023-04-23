import { Router } from "express"
import { singup, singin } from "../controllers/users.controller.js"
const userRouter = Router()

userRouter.post("/sign-up", singup)
userRouter.post("/sign-in", singin)

export default userRouter
