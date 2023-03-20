import * as functions from "firebase-functions"

import autoanalyzer from "./autoanal.js"

export const anal = functions.firestore.document("1news/{docId}").onCreate(async (snap) => {
  await autoanalyzer(snap)
})
