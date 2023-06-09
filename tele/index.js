import { TelegramClient } from "telegram"
import { StringSession } from "telegram/sessions/index.js"
import dayjs from "dayjs"
import delay from "delay"
const apiId = 00000000
const apiHash = "XXXXXXXXXXXXXXX"
const stringSession = new StringSession("XXXXXXXXXXXX")
import natural from "natural"

const tokenizer = new natural.SentenceTokenizer()
const chans = [
  "nehabar",
  "kaztag_tg",
  "atamekenbusiness",
  "dailynewskaz",
  "Zanamiviehali",
  "gbazhkenova",
  "yelikbayev",
  "basekz",
  "prostoocovid",
  "aktivistdvk",
  "Kazdvk",
  "kozachkow",
  "newsnurkz",
  "yujanka",
  "prokadrykz",
  "kazahnew",
  "ek_kz",
  "Panturknews",
  "azattyq",
  "negemedia",
  "tengri_kz",
  "jexenews",
  "asshotobozhaet",
  "adyrnaportal",
  "protenge",
  "aimagambetov",
  "abzhannews",
  "otyrarkz",
  "aigakmediaa",
  "kiprostan",
  "nexabar_guw",
  "inshym",
]

export default async function scrapeTele() {
  try {
    const client = new TelegramClient(stringSession, apiId, apiHash, {})

    await client.connect()

    const list = []
    for (const chan of chans) {
      await delay(2000)
      try {
        const mes = await client.getMessages(chan, { limit: 16 })
        const dlit = []
        for (const { message, date, id } of mes) {
          if (message == undefined || message == "") continue
          dlit.push({
            head: tokenizer.tokenize(message?.replace(/\s+/g, " "))[0],
            body: message?.replace(/\s+/g, " "),
            date: dayjs.unix(date).format("DD.MM.YY HH:mm"),
            source: "teleg@" + chan,
            link: `https://t.me/${chan}/${id}`,
          })
        }
        if (dlit.length == 0) console.log("tg", "EMPT", "https://t.me/" + chan)
        list.push(...dlit)
      } catch (e) {
        console.log("tg", "ERROR", chan + " " + e)
      }
    }
    await delay(1000)
    return list
  } catch (e) {
    console.log("tg", "XERROR", e)
    return []
  }
}
