import { store } from './store.js'

let tradList = require('./translate/' + store.getState().lang + '.json')

store.subscribe(() => {
  tradList = require('./translate/' + store.getState().lang + '.json')
})

export default function translate (tradId) {
  return tradList[tradId]
}
