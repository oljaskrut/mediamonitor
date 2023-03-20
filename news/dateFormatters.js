import { monthDic, monthDicCap, monthDicKaz, monthDicEng } from "./monthDics.js"
import dayjs from "../day/index.js"

export function today() {
  return dayjs().tz("Asia/Almaty").format("DD.MM.YY")
}

export function minmin(m) {
  return dayjs().tz("Asia/Almaty").subtract(m, "minutes").toDate()
}

export function transfo(date) {
  return dayjs.tz(date, "DD.MM.YY HH:mm", "Asia/Almaty").toDate()
}

export function yesterday() {
  return dayjs().tz("Asia/Almaty").subtract(1, "day").format("DD.MM.YY")
}

export const _today = today()
export const _yesterday = yesterday()

// check for 1digit day |1 instead of 01
export function cH0(ndt) {
  ndt = ndt.trim()
  const day = ndt.split(".")[0]
  const isP = day.length == 1
  const ldt = isP ? `0${ndt}` : ndt
  const [a, b] = ldt.split(" ")
  const ret = b.length == 4 ? a + " 0" + b : a + " " + b
  return ret
}
// check for 4digit year
export function cH1(ndt) {
  return ndt.replace("2023", "23")
}
// check for ,
export function cH2(ndt) {
  return ndt.replace(",", "")
}
// date format
export function dF0(dt) {
  return dayjs(dt).format("DD.MM.YY HH:mm")
}
// Сегодня,
export function dF1(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня", _today)
  } else if (dt.includes("Вчера")) {
    ndt = dt.replace("Вчера", _yesterday)
  } else {
    const ddt = dt.match(/[а-я]+/) ?? []
    const sbs = ddt[0] ?? ""
    ndt = dt.replace(` ${sbs} `, `.${monthDic[sbs]}.`)
  }
  return cH1(cH2(ndt))
}

export function dF1x(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня", _today)
  } else if (dt.includes("Вчера")) {
    ndt = dt.replace("Вчера", _yesterday)
  } else {
    const ddt = dt.match(/[а-я]+/) ?? []
    const sbs = ddt[0] ?? ""
    ndt = dt.replace(` ${sbs} `, `.${monthDic[sbs]}.23 `)
  }
  return cH0(cH1(cH2(ndt)))
}

export function dF2(dt) {
  return cH1(cH2(dt)).replace("Бүгін", _today)
}

export function dF3(dt) {
  const ddt = dt.match(/[A-Яa-я]+/) ?? []
  const sbs = ddt[0] ?? ""
  const ndt = dt.replace(` ${sbs} `, `.${monthDicCap[sbs]}.`) + " 10:00"
  return cH1(ndt)
}
export function dF4(dt) {
  return cH1(dt.replace("Сегодня", _today) + " 10:00")
}

export function dF5(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня,", _today)
  } else {
    const ddt = dt.match(/[а-я]+/) ?? []
    const sbs = ddt[0] ?? ""
    ndt = dt.replace(` ${sbs},`, `.${monthDic[sbs]}.23`)
  }
  return cH0(ndt)
}

export function dF6(dt) {
  let ndt = ""
  const ddt = dt.match(/[а-я]+/) ?? []
  const sbs = ddt[0] ?? ""
  ndt = dt.replace(` ${sbs} `, `.${monthDic[sbs]}.`)
  return cH0(cH1(ndt))
}

export function dF7(dt) {
  let ndt = ""
  const ddt = dt.match(/[а-я]+/) ?? []
  const sbs = ddt[0] ?? ""
  ndt = dt.replace(` ${sbs}, `, `.${monthDic[sbs]}.`)
  return cH0(cH1(ndt)) + " 10:00"
}
export function dF8(dt) {
  let ndt = ""
  const ddt = dt.match(/[A-Za-z]+/) ?? []
  const sbs = ddt[0] ?? ""
  ndt = dt.replace(`${sbs} `, "")
  ndt = ndt.replace(", ", `.${monthDicEng[sbs]}.`)
  return cH0(cH1(ndt) + " 10:00")
}

export function dF9(dt) {
  let ndt = ""
  if (dt.includes("сегодня")) {
    ndt = dt.replace("сегодня", _today)
  } else if (dt.includes("вчера")) {
    ndt = dt.replace("вчера", _yesterday)
  }
  return cH1(ndt)
}
export function dF10(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня", _today)
  } else if (dt.includes("Вчера")) {
    ndt = dt.replace("Вчера", _yesterday)
  } else {
    ndt = dt.replace(/-/g, ".")
  }
  return cH0(cH1(cH2(ndt)))
}
export function dF11(dt) {
  let ndt = ""
  if (dt.includes("Бүгін")) {
    ndt = dt.replace("Бүгін,", _today)
  } else {
    const sbs = dt.split(" ")[1].replace(",", "")
    ndt = dt.replace(` ${sbs},`, `.${monthDicKaz[sbs]}.23`)
  }
  return cH0(ndt)
}
export function dF12(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня,", _yesterday)
  } else {
    ndt = dt.replace(",", "")
  }
  return cH0(cH1(ndt))
}
export function dF13(dt) {
  let ndt = ""
  if (dt.includes("Бүгiн")) {
    ndt = dt.replace("Бүгiн", _today)
  } else if (dt.includes("Кеше")) {
    ndt = dt.replace("Кеше", _yesterday)
  } else {
    const ddt = dt.match(/[а-я]+/) ?? []
    const sbs = ddt[0] ?? ""
    ndt = dt.replace(` ${sbs}`, `.${monthDic[sbs]}.23`)
  }
  return cH0(cH1(cH2(ndt)))
}
export function dF14(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня в", _today)
  } else if (dt.includes("вчера")) {
    ndt = dt.replace("вчера,", _yesterday)
  } else {
    ndt = dt.replace("2023", "23 10:00")
  }
  return cH2(ndt)
}
export function dF15(dt) {
  return dayjs.unix(Number(dt)).format("DD.MM.YY HH:mm")
}

export function dF16(dt) {
  let ndt = ""
  if (dt.includes(":")) {
    ndt = _today + " " + dt
  } else {
    const ddt = dt.match(/[а-я]+/) ?? []
    const sbs = ddt[0] ?? ""
    ndt = dt.replace(` ${sbs}`, `.${monthDic[sbs]}.23 10:00`)
  }
  return cH0(ndt)
}

export function dF17(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня", _today)
  } else {
    const ddt = dt.match(/[а-я]+/) ?? []
    const sbs = ddt[0] ?? ""
    ndt = dt.replace(` ${sbs}`, `.${monthDic[sbs]}.23`)
  }

  const hour = ndt.split(" ")[1].split(":")[0]

  if (hour.length == 1) {
    ndt = ndt.replace(" ", " 0")
  }
  return cH0(cH1(cH2(ndt)))
}

export function dF18(dt) {
  return _today + " " + dt
}

export function dF19(dt) {
  const ddt = dt.match(/[A-Яa-я]+/) ?? []
  const sbs = ddt[0]
  const ndt = dt.replace(` ${sbs}`, `.${monthDicCap[sbs]}.`) + "23"

  const [a, b] = ndt.split(", ")
  return b + " " + a
}

export function dF20(dt) {
  let ndt = ""
  if (dt.includes("Бүгін,")) {
    ndt = dt.replace("Бүгін,", _today)
  }

  return cH0(cH1(cH2(ndt)))
}
export function dF21(dt) {
  let ndt = ""

  const ddt = dt.match(/[а-я]+/) ?? []
  const sbs = ddt[0]
  ndt = dt.replace(` ${sbs} `, `.${monthDic[sbs]}.`)
  const [a, b] = ndt.split(", ")
  return cH1(cH2(b + " " + a))
}

export function dF22(dt) {
  let ndt = ""
  if (dt.includes("бүгін,")) {
    ndt = dt.replace("бүгін,", _today)
  } else if (dt.includes("кеше,")) {
    ndt = dt.replace("кеше,", _yesterday)
  }

  return cH0(cH1(cH2(ndt)))
}

export function dF23(dt) {
  let ndt = ""
  if (dt.includes("Сегодня")) {
    ndt = dt.replace("Сегодня", _today)
  } else if (dt.includes("Вчера")) {
    ndt = dt.replace("Вчера", _yesterday)
  } else {
    ndt = dt
  }
  return cH1(cH2(ndt))
}

export function dF24(dt) {
  let ndt = ""
  if (dt.includes("сегодня")) {
    ndt = dt.replace("сегодня", _today)
  } else if (dt.includes("вчера")) {
    ndt = dt.replace("вчера", _yesterday)
  } else {
    return
  }
  const [a, b] = ndt.split(", ")
  return cH2(b + " " + a)
}
