import dayjs from "dayjs"
import { db } from "../database/database.connection.js"
import { transactionSchema } from "../schemas/transaction.schema.js"
export async function postTransaction(req, res) {
  const { type } = req.params
  const transactionBody = { ...req.body, type }

  try {
    const session = res.locals.session

    await db.collection("transactions").insertOne({
      ...transactionBody,
      userID: session.userID,
      time: Date.now(),
    })

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getTransactions(req, res) {
  try {
    const session = res.locals.session
    const transactions = await db
      .collection("transactions")
      .find({ userID: session.userID })
      .toArray()

    res.send(
      transactions.map((t) => ({ ...t, time: dayjs(t.time).format("DD/MM") }))
    )
  } catch (err) {
    res.status(500).send(err.message)
  }
}
