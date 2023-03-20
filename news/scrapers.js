import loader, { loader1 } from "./loader.js"

import {
  _today,
  _yesterday,
  dF0,
  dF1,
  dF2,
  dF3,
  dF4,
  dF5,
  dF6,
  dF7,
  dF8,
  dF9,
  dF10,
  dF11,
  dF12,
  dF13,
  dF14,
  dF15,
  dF16,
  dF17,
  cH1,
  cH2,
  dF1x,
  dF18,
  dF19,
  dF20,
  dF21,
  dF22,
  dF23,
  cH0,
  dF24,
} from "./dateFormatters.js"

const LIMIT = 16

async function _24() {
  try {
    const url = "https://24.kz/ru/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".itemsContainerWrap > .entry-content").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("h3>a")
        const head = a_.text() ?? ""
        const link = "https://24.kz" + a_.attr("href") ?? ""
        const date = dF0($(el).find("time").attr("datetime"))
        const source = "24"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _tengrinews() {
  try {
    const url = "https://tengrinews.kz/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".tn-article-item ").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.find("span").text()
        const link = "https://tengrinews.kz" + a_.attr("href")
        const date = dF1($(el).find("time").text())
        const source = "tengrinews"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _kt() {
  try {
    const url = "https://www.kt.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".row .news-list__item > article").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".news__overlay-link")
        const head = a_.text()
        const link = "https://kt.kz" + a_.attr("href")
        const date = cH1(cH2($(el).find(".news__date").text()))
        const source = "kt"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _ic24() {
  try {
    const url = "https://ic24.kz/novosti"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".news_text").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://ic24.kz" + a_.attr("href")
        const date = dF3($(el).find("p").text().trim().replace(/\s+/g, " "))
        const source = "ic24"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _time() {
  try {
    const url = "https://time.kz/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    let ldate = ""
    $(".post-items > .row").each((_, el) => {
      if (list.length < LIMIT) {
        if ($(el).attr("data-key") !== undefined) {
          const a_ = $(el).find("a")
          const head = a_.text().trim()
          const link = "https://time.kz" + a_.attr("href")
          const date = dF4($(el).find("date").text())
          const source = "time"
          if (date !== " 10:00") {
            ldate = date
          }
          list.push({ head, link, date: ldate, source })
        }
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _dknews() {
  try {
    const url = "https://dknews.kz/ru/all"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("span")
        const head = a_.text()
        const link = "https://dknews.kz" + $(el).attr("href")
        const date = dF5($(el).find("time").text())
        const source = "dknews"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _almaty() {
  try {
    const url = "https://almaty.tv/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".news-item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".news-item-title a")
        const head = a_.text()
        const link = a_.attr("href")
        const date = dF4($(el).find(".news-meta.news-date span").text())
        const source = "almaty"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _vlast() {
  try {
    const url = "https://vlast.kz/novosti"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".news-inline-item.media>.news-inline-item-body").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.find("b").text()
        const link = "https://vlast.kz" + a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime"))
        const source = "vlast"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _kazpravda() {
  try {
    const url = "https://kazpravda.kz/"
    const $ = await loader(url)
    if (!$) return []
    const lldate = $(".news-feed__body__date")[0].children[0]
    const ldate = lldate.data
    let ltime = "23:59"
    const list = []
    $(".news-feed__item ").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = $(el).find(".news-feed__title").text()
        const link = "https://kazpravda.kz" + a_.attr("href")
        let time = $(el).find("time").text()
        if (time.split(":")[0].length == 1) time = 0 + time
        const source = "kazpravda"
        let date = ""
        if (time < ltime) {
          date = dF6(`${ldate} ${time}`)
          ltime = time
          list.push({ head, link, date, source })
        }
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _informburo() {
  try {
    const url = "https://informburo.kz/novosti"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    let day = ""
    $(".uk-nav-default > li").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const link = a_.attr("href")
        const head = a_.text().replace($(el).find("time").text(), "").replace($(el).find("span").text(), "").trim()
        const time = $(el).find("time").text()
        if (!time) {
          const g = $(el).find("h2.date-heading").text()
          day = g
        }
        const date = dF1x(day + " " + time)
        const source = "informburo"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _qazaqjoly() {
  try {
    const url = "https://qazaqjoly.kz/?cat=524"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".listing-widget article.type-post").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a.post-title")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime") ?? "")
        const source = "qazaqjoly"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _zakon() {
  try {
    const url = "https://www.zakon.kz/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".zmainCard_item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = $(el).find("div.title").text().trim()
        const link = "https://zakon.kz" + a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime") ?? "")
        const source = "zakon"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _on7news() {
  try {
    const url = "https://www.on7news.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".jeg_block_container>.jeg_posts_wrap>.jeg_posts article.jeg_post > .jeg_postblock_content").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".jeg_post_title a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF7($(el).find(".jeg_meta_date a").text().trim())
        const source = "on7news"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _adilettv() {
  try {
    const url = "https://www.adilettv.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".af-container-row>article").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".read-title a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF8($(el).find(".posts-date").text().trim())
        const source = "adilettv"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _stan() {
  try {
    const url = "https://www.stan.kz/all-news/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".paginate-container > a").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el)
        const head = a_.find("h2").text().trim()
        const link = "https://stan.kz" + a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime") ?? "")
        const source = "stan"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _inform() {
  try {
    const url = "https://www.inform.kz/ru/lenta"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".news-list__col_main article.anounce-news").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a.anounce-news__link")
        const head = a_.text()
        const link = "https://inform.kz" + a_.attr("href")
        const date = dF9($(el).find("span").text())
        const source = "inform"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _kazlenta() {
  try {
    const url = "https://www.kazlenta.kz/main"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("#dle-content>.shortstory.cf").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".short_title a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF10($(el).find(".date").text())
        const source = "kazlenta"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _aqparat() {
  try {
    const url = "https://www.aqparat.info/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("article").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF0($(el).find(".updated abbr.value").attr("title") + " " + $(el).find(".updated span.value").text())
        const source = "aqparat"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _jasqazaq() {
  try {
    const url = "https://www.jasqazaq.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".baron__scroller>.items>.item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = $(el).find(".item__title").text().trim()
        const link = a_.attr("href")
        const date = dF11($(el).find(".datetime").text())
        const source = "jasqazaq"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _sn() {
  try {
    const url = "https://www.sn.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".lenta__items:first > .lenta__item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://sn.kz" + a_.attr("href")
        const date = dF2($(el).find("span").text())
        const source = "sn"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _365info() {
  try {
    const url = "https://365info.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".lastnews>.lastnews__items>.lastnews__item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = $(el).find(".lastnews__item-title").text().trim()
        const link = a_.attr("href")
        const date = dF17($(el).find(".lastnews__item-datetime").text())
        const source = "365info"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _newtimes() {
  try {
    const url = "https://newtimes.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".info>.items>a").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el)
        const head = $(el).find(".text").text().trim()
        const link = a_.attr("href")
        const date = dF12($(el).find(".data").text())
        const source = "newtimes"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _polisia() {
  try {
    const url = "https://polisia.kz/ru/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".listing-item > .item-inner").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a.post-url.post-title")
        const head = a_.text().trim().replace(/\s+/g, " ")
        const link = a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime") ?? "")
        const source = "polisia"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _baq() {
  try {
    const url = "https://baq.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".l-col>a.l-col__item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el)
        const head = $(el).find(".l-col__item_title").text().trim()
        const link = a_.attr("href")
        const date = dF13($(el).find(".l-col__item_date").text().replace($(el).find(".l-col__item_date>span").text(), ""))
        const source = "baq"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _ult() {
  try {
    const url = "https://ult.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".state-aside > .aside-state-item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF4($(el).find(".time").text())
        const source = "ult"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _liter() {
  try {
    const url = "https://liter.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".lenta-news__item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a.last-news__link")
        const head = a_.text().trim()
        const link = "https://liter.kz" + a_.attr("href")
        const date = dF14($(el).find(".last-news__date").text())
        const source = "liter"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _ratel() {
  try {
    const url = "https://ratel.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    let ldate = _today
    let ltime = "23:59"
    let count = 0
    $(".news.tab_item > .article").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".article__title a")
        const head = a_.text().trim()
        const link = "https://ratel.kz" + a_.attr("href")
        const time = $(el).find(".article__time").text()
        const source = "ratel"
        let date = ""
        if (count < 2) {
          if (time > ltime) {
            ldate = _yesterday
            count++
          }
          date = dF6(`${ldate} ${time}`)
          ltime = time
          if (head) list.push({ head, link, date, source })
        }
      }
    })
    return list.slice(0, -2)
  } catch (e) {
    return []
  }
}
async function _sputnik() {
  try {
    const url = "https://ru.sputnik.kz/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".list__item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a.list__title")
        const head = a_.text().trim()
        const link = "https://ru.sputnik.kz" + a_.attr("href")
        const date = dF15($(el).find(".list__date").attr("data-unixtime") ?? "")
        const source = "sputnik"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _caravan() {
  try {
    const url = "https://caravan.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".hot-news__items > article").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://caravan.kz" + a_.attr("href")
        const date = dF16($(el).find("time").text())
        const source = "caravan"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _baigenews() {
  try {
    const url = "https://baigenews.kz/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".finded__content__item a").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el)
        const head = a_.find(".finded__content__item__content__title").text().trim()
        const link = a_.attr("href")
        const date = cH1(a_.attr("data-time")?.slice(0, -3)) ?? ""
        const source = "baigenews"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _aikyn() {
  try {
    const url = "https://aikyn.kz/news/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".post-box").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.find(".post-box__title").text().trim()
        const link = a_.attr("href")
        const date = $(el).find("time").text().replace("2023", "23	")
        const source = "aikyn"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _nur() {
  try {
    const url = "https://nur.kz/latest"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".block-infinite > ul > li > article").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.find("h2").text().trim()
        const link = a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime"))
        const source = "nur"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _ktk() {
  try {
    const url = "http://ktk.kz/ru/newsfeed"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    let day = ""
    $(".row.newsfeed > article,h2").each((_, el) => {
      if (list.length < LIMIT) {
        if ($(el).text().trim().length > 12) {
          const a_ = $(el).find("a")
          const head = a_.find("h3").text().trim()
          const link = "https://ktk.kz/ru/newsfeed" + a_.attr("href")
          const date = day.replace("2023", "23") + " " + $(el).find(".list-newsfeed__date").text()
          const source = "ktk"
          if (head) list.push({ head, link, date, source })
        } else {
          day = $(el).text().trim().includes("Сегодня") ? _today : $(el).text().trim()
        }
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _inbusiness() {
  try {
    const url = "http://inbusiness.kz/ru/last"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".catitems2 > a").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el)
        const head = a_.find("span").text().trim()
        const link = a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime"))
        const source = "inbusiness"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _nege() {
  try {
    const url = "https://nege.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".last-news>.item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://nege.kz" + a_.attr("href")
        const date = dF18($(el).text().trim().slice(0, 5))
        const source = "nege"
        if (head && date.includes(":")) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _ainews() {
  try {
    const url = "https://ainews.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("[class^='Grid_root__'] > [class^='Grid_item__'] > article").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.find("h2").text().trim()
        const link = "https://ainews.kz" + a_.attr("href")
        const date = dF19($(el).find("time").text())
        const source = "ainews"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _egemen() {
  try {
    const url = "https://egemen.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".last-news >.news-t>.text-news").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://egemen.kz" + a_.attr("href")
        const date = dF20($(el).find(".text-grey").text())
        const source = "egemen"
        if (head && date) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _ernur() {
  try {
    const url = "http://ernur.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".last-news__inner >.last-news__item>div>.item-details").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://ernur.kz" + a_.attr("href")
        const date = cH1($(el).find("time").attr("datetime"))
        const source = "ernur"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _gurk() {
  try {
    const url = "https://gurk.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("#news-widget-container >article>.main-news-block-item-content").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://gurk.kz" + a_.attr("href")
        const date = dF0($(el).find("[datetime]").attr("datetime"))
        const source = "gurk"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _mail() {
  try {
    const url = "https://mail.kz/ru/news/kz-news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".news-list > ul > li > a").each((_, el) => {
      if (list.length < LIMIT) {
        const head = $(el).attr("title")
        const link = "https://mail.kz" + $(el).attr("href")
        const date = dF21($(el).find(".date").text())
        const source = "mail"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _alashainasy() {
  try {
    const url = "https://alashainasy.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("#latest-news > a").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el)
        const head = a_.text().trim().split("\n")[0]
        const link = "https://alashainasy.kz" + a_.attr("href")
        const date = dF22($(el).find(".date").text())
        const source = "alashainasy"
        if (head && date) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _yujanka() {
  try {
    const url = "https://yujanka.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".wrap-latest>.row-last-news").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim().replace("→", "")
        const link = a_.attr("href")
        const date = cH1($(el).find(".date-news").text())
        const source = "yujanka"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

async function _turanpress() {
  try {
    const url = "https://turanpress.kz/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".news_list>.news_list_item>div").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".f_title a")
        const head = a_.text().trim()
        const link = "https://turanpress.kz" + a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime"))
        const source = "turanpress"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _azattyqruhy() {
  try {
    const url = "https://rus.azattyq-ruhy.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".last_news__list>div>.last_news__list--item").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF23($(el).find(".last_news__date").text())
        const source = "azattyqruhy"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _kaztag() {
  try {
    const url = "https://kaztag.kz/ru"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("ul.news>li>.right-col").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = "https://kaztag.kz" + a_.attr("href")
        const date = dF24($(el).find(".t-info-2>b").text().trim())
        const source = "kaztag"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _turkystan() {
  try {
    const url = "https://turkystan.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("ul.list-group>li>div:nth-child(2)").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = cH1($(el).find("span>small").text().trim().slice(0, 18).replace(" /", ""))
        const source = "turkystan"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _ulysmedia() {
  try {
    const url = "https://ulysmedia.kz/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("div.row:nth-child(2)>div[class^='col']").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find(".category__title")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF0($(el).find("span.date").attr("title"))
        const source = "ulysmedia"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _otyrar() {
  try {
    const url = "https://otyrar.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("#tdi_12>div[class^='td-block']>div>.item-details").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = dF0($(el).find("time").attr("datetime"))
        const source = "otyrar"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _aigak() {
  try {
    const url = "https://aigak.kz/news"
    const $ = await loader1(url)
    if (!$) return []
    const list = []
    $(".jeg_main_content .jeg_posts>article>.jeg_postblock_content").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("h3>a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = cH1($(el).find(".jeg_meta_date>a").text().trim() + " 10:00")
        const source = "aigak"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _basnews() {
  try {
    const url = "https://basnews.kz/ru/cat/news"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("#posts-container>li.post-item>.post-details").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("h2>a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = cH1($(el).find(".date").text() + " 10:00")
        const source = "basnews"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _syrboyi() {
  try {
    const url = "https://syrboyi.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("ul.recent-news-list>li").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.find("h5").text().trim()
        const link = a_.attr("href")
        const date = cH1($(el).find(".post-date").text().trim() + " 10:00")
        const source = "syrboyi"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _zonakz() {
  try {
    const url = "https://zonakz.net/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("ul.znews-ul>li").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = cH1($(el).find("time").attr("datetime"))
        const source = "zonakz"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _adyrna() {
  try {
    const url = "https://adyrna.kz/category/zhanalyktar"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".category-content>.news").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a.news__title")
        const head = a_.text().trim()
        const link = a_.attr("href")
        const date = cH1($(el).find(".news__date").text().trim() + " 10:00")
        const source = "adyrna"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _zhasalash() {
  try {
    const url = "https://zhasalash.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".rows>.lt-nws-list").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const link = "https://zhasalash.kz" + a_.attr("href")
        const time = $(el).find("span").text().trim()
        const head = a_.text().replace(time, "").trim()
        const date = time.length === 5 ? _today + " " + time : ""
        const source = "zhasalash"
        if (head && date) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _qamshy() {
  try {
    const url = "https://qamshy.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".tabs__item>.tabs__item__text").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const link = "https://qamshy.kz" + a_.attr("href")
        const time = $(el).find("span").text().trim()
        const head = a_.text().trim()
        const date = time.length === 5 ? _today + " " + time : ""
        const source = "qamshy"
        if (head && date) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _qazradio() {
  try {
    const url = "https://qazradio.fm/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $("#articles>.widget-post>.widget-post-body").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("a")
        const link = "https://qazradio.fm" + a_.attr("href")
        const head = a_.text().trim()
        const date = cH1($(el).find(".date").text().trim() + " 10:00")
        const source = "qazradio"
        if (head && date) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}
async function _toppress() {
  try {
    const url = "https://toppress.kz/"
    const $ = await loader(url)
    if (!$) return []
    const list = []
    $(".jeg_postsmall.jeg_load_more_flag>article>div").each((_, el) => {
      if (list.length < LIMIT) {
        const a_ = $(el).find("h3>a")
        const link = a_.attr("href")
        const head = a_.text().trim()
        const [a, b, c] = $(el).find(".jeg_meta_date>a").text().trim().split("/")
        const date = cH0(`${b}.${a}.23 ${c}`)
        const source = "toppress"
        if (head) list.push({ head, link, date, source })
      }
    })
    return list
  } catch (e) {
    return []
  }
}

const f4l = [
  _24,
  _tengrinews,
  _kt,
  _ic24,
  _time,
  _dknews,
  _almaty,
  _vlast,
  _kazpravda,
  _informburo,
  _qazaqjoly,
  _zakon,
  _on7news,
  _adilettv,
  _stan,
  _inform,
  _kazlenta,
  _aqparat,
  _jasqazaq,
  _sn,
  _365info,
  _newtimes,
  _polisia,
  _baq,
  _ult,
  _liter,
  _ratel,
  _caravan,
  _baigenews,
  _sputnik,
  _aikyn,
  _nur,
  _ktk,
  _inbusiness,
  _nege,
  _ainews,
  _egemen,
  _ernur,
  _gurk,
  _mail,
  _alashainasy,
  _yujanka,
  _turanpress,
  _azattyqruhy,
  _kaztag,
  _turkystan,
  _ulysmedia,
  _otyrar,
  _aigak,
  _basnews,
  _syrboyi,
  _zonakz,
  _adyrna,
  _zhasalash,
  _qamshy,
  _qazradio,
  _toppress,
]

export default f4l
