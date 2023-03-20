import { TelegramClient } from "telegram"
import { NewMessage } from "telegram/events/index.js"
import { StringSession } from "telegram/sessions/index.js"
import natural from "natural"
const tokenizer = new natural.SentenceTokenizer()
import dayjs from "dayjs"

const dic = {
  1218366742: "nehabar",
  1412938256: "kaztag_tg",
  1136746894: "atamekenbusiness",
  1498691839: "dailynewskaz",
  1388235001: "Zanamiviehali",
  1482258077: "gbazhkenova",
  1069764941: "yelikbayev",
  1249510014: "basekz",
  1406405366: "prostoocovid",
  1165397614: "aktivistdvk",
  1147181000: "Kazdvk",
  1490840037: "kozachkow",
  1190042072: "newsnurkz",
  1179616360: "yujanka",
  1302954620: "prokadrykz",
  1772774732: "kazahnew",
  1408005466: "ek_kz",
  1167557693: "Panturknews",
  1084867760: "azattyq",
  1272065266: "negemedia",
  1135542117: "tengri_kz",
  1235448640: "jexenews",
  1590521877: "asshotobozhaet",
  1336149459: "adyrnaportal",
  1349384358: "protenge",
  1794897446: "aimagambetov",
  1273449215: "abzhannews",
  1282667756: "otyrarkz",
  1444918591: "aigakmediaa",
  1764768354: "kiprostan",
  1785567628: "nexabar_guw",
  1410145269: "inshym",
}

const apiId = 21766395
const apiHash = "6220f146c07fc5489f7578860a0ae4de"
const stringSession = new StringSession(
  "1AgAOMTQ5LjE1NC4xNjcuNTEBuwn9NTEHqxB0OqUdOZUay57JhBdHzohvD3GUsTXSd3TzX1iwbzpr6sXTI4xNpKzAHTmLuxQC+N703WOgdHOLoGzyzoBF2SkgfyquIFD10YVedenqIlqCsInwBWwiUtw8DmheQ0/d5KLK14zZiLoKtdvAd+wtvBoXl2KNBDD+GG5Oe5pmj34SjSzcIF4hNRJFSktYRHgfPzmyuJzHAxm21QpHzHWnRQBy/0WXxRGAHsxPUqi8HDpY0xw1XTReOjoVNW2FOtu5aSyVYo1AjhWuHU1TacntDRIiRNkYJLvObNTsGVoyaIcNVYvydRDb1dD72JN12o0bT7kcDIPgAF1SuBs=",
) // 747
const client = new TelegramClient(stringSession, apiId, apiHash, {})
await client.connect()

async function hand({ message: { id, peerId, date, message } }) {
  const obj = {
    id,
    chan: dic[peerId?.channelId?.value] ?? "unknown",
    date: dayjs.unix(date).format("DD.MM.YY HH:mm"),
    message: message?.replace(/\s+/g, " "),
  }
  if (obj.chan === "unknown" || obj.message === "") return
  const jobj = {
    head: tokenizer.tokenize(obj.message)[0],
    body: obj.message,
    date: obj.date,
    source: "teleg@" + obj.chan,
    link: `https://t.me/${obj.chan}/${obj.id}`,
  }
  console.log(jobj)
}
try {
  client.addEventHandler(hand, new NewMessage())
  client.start()
  console.log("started G")
} catch (e) {
  console.log(e)
}
