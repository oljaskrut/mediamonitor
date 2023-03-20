import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone.js"
import utc from "dayjs/plugin/utc.js"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export default dayjs
