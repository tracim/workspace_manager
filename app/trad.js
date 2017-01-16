import { store } from './store.js'

let tradList = require('./translate/' + store.getState().tracimConfig.lang + '.json')

store.subscribe(() => {
  tradList = require('./translate/' + store.getState().tracimConfig.lang + '.json')
})

export default function translate (tradId) {
  return tradList[tradId]
}
