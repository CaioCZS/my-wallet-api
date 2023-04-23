import { db } from "../database/database.connection.js"
import { ObjectId } from "mongodb"
import { transactionSchema } from "../schemas/transaction.schema.js"
export async function postTransaction(req, res) {
  const { type } = req.params
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")
  if (!token) return res.sendStatus(401)

  const transactionBody = { ...req.body, type }
  const validation = transactionSchema.validate(transactionBody, {
    abortEarly: false,
  })
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message)
    return res.status(422).send(errors)
  }
  try {
    const session = await db.collection("sessions").findOne({ token })
    if (!session) return res.status(401).send("Sessão expirada")

    await db
      .collection("transactions")
      .insertOne({ ...transactionBody, userID: session.userID })

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
