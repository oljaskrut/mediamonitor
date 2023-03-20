import dayjs from "../day/index.js"

export default function filter(dataRaw, body = false) {
  const dt = dayjs().tz("Asia/Almaty").format("DD.MM.YY")
  const drl = dataRaw.length
  let dfl = 0
  let dcl = 0
  const dataClean = []

  for (const item of dataRaw) {
    if (item == undefined) continue
    if (item.date.match(/\d\d.\d\d.\d\d \d\d:\d\d/) == null) continue
    dfl += 1
    if (!item.date.startsWith(dt)) continue
    dcl += 1
    const text = body ? item.body : item.head
    if (text.toLowerCase().includes("шымкент")) {
      dataClean.push(item)
    }
  }

  const elit = dataRaw[0]?.source
  let cat = ""
  if (elit == undefined) {
    cat = "xsz"
  } else {
    cat = elit.includes("@") ? elit.split("@")[0] : "news"
  }
  console.log("filter", cat, "{" + drl + "}=(filter)>{" + dfl + "}=(time)>{" + dcl + `}=(word("шымкент")>{` + dataClean.length + "}")
  return dataClean
}
