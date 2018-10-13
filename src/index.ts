import * as rp from 'request-promise'
import * as types from './types'
import * as utils from './utils'

export interface IConfig {
  appid: string
  partner_key: string
  mch_id: string
  subMchId?: string
  pfx?: string
  cert?: string
  key?: string
}

// tslint:disable:object-literal-sort-keys
const Urls = {
  unifiedOrder: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
  refund: 'https://api.mch.weixin.qq.com/secapi/pay/refund',
  refundQuery: 'https://api.mch.weixin.qq.com/pay/refundquery'
}
// tslint:enable:object-literal-sort-keys

export default class WxPay {
  private config: IConfig

  constructor(config: IConfig) {
    this.config = config
  }

  public async createUnifiedOrder(opts: types.ICreateUnifiedOrderOptions) {
    // tslint:disable:object-literal-sort-keys
    // assign common config to opts
    const body: types.ICreateUnifiedOrderReq = {
      ...opts,
      appid: this.config.appid,
      mch_id: this.config.mch_id,
      nonce_str: utils.generateNonceString(),
      sign: null as string,
      sign_type: 'MD5'
    }
    body.sign = utils.sign(body, this.config.partner_key)

    const xmlStr = await rp({
      url: Urls.unifiedOrder,
      method: 'POST',
      body: utils.buildXML(body)
    })
    // tslint:enable:object-literal-sort-keys
    return (await utils.parseXML(xmlStr)) as (types.ICreateUnifiedOrderRes | types.IRes)
  }

  public async parsePayNotify(xmlStr: string) {
    const notify = (await utils.parseXML(xmlStr)) as types.IPayNotify
    const sign = utils.sign(notify, this.config.partner_key)
    if (sign === notify.sign) {
      return notify
    }
  }

  public async parseRefundNotify(xmlStr: string) {
    const notify = (await utils.parseXML(xmlStr)) as types.IcrypticNotify
    // TODO: decrypt req_info
    return notify as types.IRefundNotify
  }

  public setupRes(errMsg?: string) {
    if (errMsg) {
      return utils.buildXML({
        return_code: 'FAIL',
        return_msg: errMsg
      } as types.IRes)
    } else {
      return utils.buildXML({
        return_code: 'SUCCESS',
        return_msg: 'OK'
      } as types.IRes)
    }
  }

  public async refund(opts: types.IRefundOptions) {
    // tslint:disable:object-literal-sort-keys
    // assign common config to opts
    const body: types.IRefundReq = {
      ...opts,
      appid: this.config.appid,
      mch_id: this.config.mch_id,
      nonce_str: utils.generateNonceString(),
      sign: null as string,
      sign_type: 'MD5'
    }
    body.sign = utils.sign(body, this.config.partner_key)

    const xmlStr = await rp({
      url: Urls.refund,
      method: 'POST',
      body: utils.buildXML(body),
      agentOptions: {
        cert: this.config.cert,
        key: this.config.key,
        pfx: this.config.pfx,
        passphrase: this.config.mch_id
      }
    })
    // tslint:enable:object-literal-sort-keys
    return (await utils.parseXML(xmlStr)) as (types.IRefundRes | types.IRes)
  }

  public async refundQuery(opts: types.IRefundQueryOptions) {
    // tslint:disable:object-literal-sort-keys
    // assign common config to opts
    const body: types.IRefundQueryReq = {
      ...opts,
      appid: this.config.appid,
      mch_id: this.config.mch_id,
      nonce_str: utils.generateNonceString(),
      sign: null as string,
      sign_type: 'MD5'
    }
    body.sign = utils.sign(body, this.config.partner_key)

    const xmlStr = await rp({
      url: Urls.refundQuery,
      method: 'POST',
      body: utils.buildXML(body)
    })
    // tslint:enable:object-literal-sort-keys
    return (await utils.parseXML(xmlStr)) as (types.IRefundQueryRes | types.IRes)
  }
}
