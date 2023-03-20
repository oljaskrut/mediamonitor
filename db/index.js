import db from "./db.js"
import { createHash } from "crypto"

export async function uploadMultipleS(fd) {
  const batch = db.batch()
  let batchCount = 0
  for (const el of fd) {
    try {
      const collectionRef = db.collection("1news")
      const snapshot = await collectionRef.where("link", "==", el.link).count().get()
      const count = snapshot.data().count
      if (count === 0) {
        const hash = createHash("md5")
          .update(el.link ?? el.head)
          .digest("hex")
        batchCount = +1
        batch.set(db.collection("1news").doc(hash), el)
        console.log("db", hash, "")
      }
    } catch (e) {
      console.log("db", "UPM", e)
    }
  }
  if (batchCount != 0) await batch.commit()
}

export async function uploadSingleZ(el) {
  try {
    const hash = createHash("md5")
      .update(el.link ?? el.head)
      .digest("hex")
    await db.collection("1newz").doc(hash).set(el)
    console.log("db", hash, "")
  } catch (e) {
    console.log("db", "UPS", e)
  }
}
