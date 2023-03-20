import f4l from "./scrapers.js"

export default async function scrapeNews() {
  const cola = []
  const promises = f4l.map(async (f) => {
    const res = await f()
    if (res.length == 0) console.log("nw", "empt", f.name)
    cola.push(...res)
  })

  await Promise.all(promises).catch(console.log)
  return cola
}
