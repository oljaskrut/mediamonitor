import delay from "delay"
import axios from "axios"
import axiosRetry from "axios-retry"
axiosRetry(axios, {
  retries: 3,
  retryDelay: (c) => c * 1000,
})
import natural from "natural"
import dayjs from "../day/index.js"

const tokenizer = new natural.SentenceTokenizer()
async function scrape(tag) {
  const options = {
    method: "GET",
    url: "https://instagram-scraper-2022.p.rapidapi.com/ig/posts_username/",
    params: { user: tag.replace(/\r?\n|\r/g, "") },
    headers: {
      "X-RapidAPI-Key": "xxxxxxxxxxxxxxxxxxxxxxxx",
      "X-RapidAPI-Host": "instagram-scraper-2022.p.rapidapi.com",
    },
  }
  try {
    await delay(~~(Math.random() * 5000))
    const { data } = await axios.request(options)

    if (data.status !== "ok") {
      console.log("ig", "STATUS", tag + " " + data.status)
      return []
    }
    const list = []
    data.data.user.edge_owner_to_timeline_media.edges.forEach((el) => {
      const body = el.node.edge_media_to_caption?.edges[0]?.node?.text.replace(/\s+/g, " ")
      if (body !== undefined) {
        const head = tokenizer.tokenize(body)[0]
        const source = "insta@" + tag
        const link = "https://instagram.com/p/" + el.node.shortcode
        const date = dayjs.unix(el.node.taken_at_timestamp).format("DD.MM.YY HH:mm")
        list.push({ head, body, link, date, source })
      }
    })
    if (list.length == 0) console.log("ig", "empt", "https://instagram.com/" + tag)
    return list
  } catch (e) {
    console.log("ig", "BROKEN", tag, e)
    return []
  }
}

export default async function scrapeInst() {
  const cola = []
  const lsr = [
    "elitar.kz",
    "ztb_kz",
    "kaznews",
    "vse_novosti_kz",
    "nv.kz",
    "today_qaz",
    "shymkent.online",
    "shyndykz",
    "novosti_shymkenta",
    "shymkent_resmi",
    "zin.brat",
  ]
  const promises = lsr.map(async (f) => {
    const res = await scrape(f)
    cola.push(...res)
  })
  await Promise.all(promises).catch((e) => {
    console.log("ig", "PROXER", e)
  })
  return cola
}
