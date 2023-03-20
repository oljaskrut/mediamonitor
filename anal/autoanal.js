import language from "@google-cloud/language"
import pkg from "@google-cloud/translate"
const { Translate } = pkg.v2
import dayjs from "../day/index.js"
import { uploadSingleZ } from "../db/index.js"
import send from "../send/index.js"

const client = new language.LanguageServiceClient()
const translate = new Translate()

const POSITIVE_THRESHOLD = 0.2
const NEGATIVE_THRESHOLD = -0.4

async function analz(text) {
  try {
    const target = "en"
    let [translations] = await translate.translate(text, target)
    translations = Array.isArray(translations) ? translations : [translations]
    const textTrans = translations[0]
    const document = {
      content: textTrans,
      type: "PLAIN_TEXT",
    }
    const [result] = await client.analyzeSentiment({ document })
    const score = result?.documentSentiment?.score ?? 0
    const label = score > POSITIVE_THRESHOLD ? "positive" : score < NEGATIVE_THRESHOLD ? "negative" : "neutral"
    const obj = { textTrans, score, label }
    return obj
  } catch (e) {
    console.log("aa", "analz", e)
    return { label: null }
  }
}

export default async function autoanalyzer(snap) {
  try {
    const el = snap.data()
    const obj = el.body ? await analz(el.body) : await analz(el.head)
    const bobj = { ...el, ...obj, timestamp: dayjs.tz(el.date, "DD.MM.YY HH:mm", "Asia/Almaty").toDate() }
    if (bobj.label === "negative" && bobj.source.includes("@")) await send(bobj)
    await uploadSingleZ(bobj)
  } catch (e) {
    console.log("aa", "FINAL", e)
  }
}
