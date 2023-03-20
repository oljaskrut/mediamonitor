import axios from "axios"
import { load } from "cheerio"
import axiosRetry from "axios-retry"
import https from "https"

axiosRetry(axios, { retries: 3, retryDelay: (c) => c * 1000 })
export default async function loader(url) {
  try {
    const { data } = await axios(encodeURI(url), {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    }).catch((e) => {
      console.log(e.message, e.config.url)
      return e
    })
    return load(data)
  } catch (e) {
    console.log("loader", e.message, e.url)
    return
  }
}
export async function loader1(url) {
  const { data } = await axios(encodeURI(url), {
    headers: {
      "Accept-Encoding": "gzip,deflate,compress",
    },
  }).catch((e) => {
    if (e.response.status == 404) return e.response
  })
  return load(data)
}
