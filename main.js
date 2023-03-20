// import { onSchedule } from "firebase-functions/v2/scheduler"
// import { onRequest } from "firebase-functions/v2/https"
import * as functions from "firebase-functions"
import { uploadMultipleS } from "./db/index.js"
import filter from "./filter/index.js"
import scrapeNews from "./news/index.js"
import scrapeInst from "./inst/index.js"
import scrapeFace from "./face/index.js"
import scrapeTele from "./tele/index.js"

const nameDic = [
  ["scnw", scrapeNews],
  ["scig", scrapeInst],
  ["scfb", scrapeFace],
  ["sctg", scrapeTele],
]

const colec = {}

async function pipe(data, body) {
  const fd = filter(data, body)
  await uploadMultipleS(fd)
  return fd
}

for (const [name, func] of nameDic) {
  const body = !(name === "scnw")

  colec[name] = functions.runWith({ timeoutSeconds: 300, memory: "1GB" }).https.onRequest(async (_, res) => {
    const data = await func()
    const fd = await pipe(data, body)
    res.send(fd)
  })

  if (name === "sctg") continue

  colec["a" + name] = functions
    .runWith({ memory: "512MB", timeoutSeconds: 300 })
    .pubsub.schedule("*/15 7-23 * * *")
    .timeZone("Asia/Almaty")
    .onRun(async () => {
      const data = await func()
      await pipe(data, body)
    })
}

export default colec
