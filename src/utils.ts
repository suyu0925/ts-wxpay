import * as crypto from 'crypto'
import { promisify } from 'util'
import * as xml2js from 'xml2js'

export function buildXML(json: any) {
  const builder = new xml2js.Builder()
  return builder.buildObject(json)
}

export async function parseXML(xml: string) {
  const parser = new xml2js.Parser({
    explicitArray: false,
    explicitRoot: false,
    trim: true
  } as xml2js.Options)
  const parseString = promisify(parser.parseString.bind(parser))
  return await parseString(xml)
}

export function generateNonceString(length: number = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxPos = chars.length
  let noceStr = ''
  for (let i = 0; i < (length || 32); i++) {
    noceStr += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return noceStr
}

export function md5(plain: string) {
  return crypto.createHash('md5').update(plain, 'utf8').digest('hex').toUpperCase()
}

export function sign(param: any, partnerKey: string) {
  const querystring = Object.keys(param).filter((key) => {
    return param[key] !== undefined
      && param[key] !== ''
      && ['pfx', 'partner_key', 'sign', 'key'].indexOf(key) < 0
  }).sort().map((key) => {
    return key + '=' + param[key]
  }).join('&')
    + '&key=' + partnerKey

  return md5(querystring)
}
