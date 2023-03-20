import { Telegraf } from "telegraf"
const bot = new Telegraf("5732459634:XXXXXXXXXXXXXXX")
export default async function send({ head, link, source }) {
  const mes = `<b>${head}</b>\n<a href="${link}">${source}</a>`
  //	653826845 //-1001557992476n
  await bot.telegram.sendMessage("-1001557992476n", mes, { parse_mode: "HTML" })
}
