import { Router } from "express"
import { singup, singin } from "../controllers/users.controller.js"
import { schemaValidation } from "../middlewares/schema.middlewate.js"
import { userSchema, schemaLogin } from "../schemas/user.schema.js"
const userRouter = Router()

userRouter.post("/sign-up", schemaValidation(userSchema), singup)
userRouter.post("/sign-in", schemaValidation(schemaLogin), singin)

export default userRouter
