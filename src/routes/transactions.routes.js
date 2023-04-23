import { Router } from "express"
import {
  getTransactions,
  postTransaction,
} from "../controllers/transaction.controller.js"

const transactionRouter = Router()

transactionRouter.post("/new-transaction/:type", postTransaction)
transactionRouter.get("/transactions", getTransactions)

export default transactionRouter
