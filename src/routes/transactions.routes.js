import { Router } from "express"
import {
  getTransactions,
  postTransaction,
} from "../controllers/transaction.controller.js"
import { authvalidation } from "../middlewares/auth.middleware.js"
import { schemaValidation } from "../middlewares/schema.middlewate.js"
import { transactionSchema } from "../schemas/transaction.schema.js"
const transactionRouter = Router()

transactionRouter.use(authvalidation)

transactionRouter.post(
  "/new-transaction/:type",
  schemaValidation(transactionSchema),
  postTransaction
)
transactionRouter.get("/transactions", getTransactions)

export default transactionRouter
