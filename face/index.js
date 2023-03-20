import axios from "axios"
import delay from "delay"
import natural from "natural"

const tokenizer = new natural.SentenceTokenizer()
async function scrape(tag, name) {
  try {
    await delay(~~(Math.random() * 5000))
    const { data } = await axios(`https://us-central1-XXXXXXX.cloudfunctions.net/scrapeface?tag=${tag}&name=${name}`)
    if (data.length == 0) console.log("fb", "emt", name)
    const ndata = []
    data.forEach((el) => {
      const body = el.head.replace(/\s+/g, " ")
      if (body.length != 0) {
        const head = tokenizer.tokenize(body)[0]
        const source = el.source
        const date = el.date
        const link = el.link
        ndata.push({ head, body, date, link, source })
      }
    })
    return ndata
  } catch (e) {
    console.log("fb", "XER", e)
    return []
  }
}

export default async function scrapeFace() {
  const namem = [
    ["AigulOrynbek", "profile.php?id=100007981087790"],
    ["AminaKolbayeva", "profile.php?id=100008181855482"],
   
  ]

  const promiscious = []
  for (let i = 0; i < namem.length; i++) {
    promiscious.push(scrape(namem[i][1], namem[i][0]))
  }

  const res = await Promise.all(promiscious).catch((e) => {
    console.log("fb", "PROXER", e)
    return []
  })
  const data = []
  res.forEach(async (ndata) => {
    if (ndata.length !== 0) {
      data.push(...ndata)
    }
  })
  return data
}
