import { IReq, IRes, TradeType } from './common'

export * from './common'

export interface IBaseSceneInfo {
  h5_info: {
    type: 'IOS' | 'Android' | 'Wap'
  }
}

export interface IIOSSceneInfo extends IBaseSceneInfo {
  h5_info: {
    type: 'IOS' // IOS移动应用
    app_name: string // 应用名
    bundle_id: string
  }
}

export interface IAndroidSceneInfo extends IBaseSceneInfo {
  h5_info: {
    type: 'Android' // 安卓移动应用
    app_name: string // 应用名
    package_name: string // 包名
  }
}

export interface IH5SceneInfo extends IBaseSceneInfo {
  h5_info: {
    type: 'Wap' // 场景类型
    wap_url: string // WAP网站URL地址
    wap_name: string // WAP 网站名
  }
}

type ISceneInfo = IIOSSceneInfo | IAndroidSceneInfo | IH5SceneInfo

// https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1
export interface ICreateUnifiedOrderOptions {
  device_info?: 'WEB' | string // 终端设备号(门店号或收银设备ID)，注意：PC网页或公众号内支付请传"WEB"
  body: string // 商品简单描述，该字段须严格按照规范传递
  detail?: string // 单品优惠字段(暂未上线)
  attach?: string // 附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
  out_trade_no: string // 商户系统内部的订单号,32个字符内、可包含字母
  fee_type?: string // 符合ISO 4217标准的三位字母代码，默认人民币：CNY
  total_fee: number // 订单总金额，单位为分
  spbill_create_ip: string // 必须传正确的用户端IP
  notify_url: string // 接收微信支付异步通知回调地址，通知url必须为直接可访问的url，不能携带参数
  trade_type: TradeType
  product_id?: string // trade_type=NATIVE，此参数必传。此id为二维码中包含的商品ID，商户自行定义。
  limit_pay?: 'no_credit' // no_credit--指定不能使用信用卡支付
  openid?: string // trade_type=JSAPI，此参数必传，用户在商户appid下的唯一标识。openid如何获取，可参考【获取openid】。
  // 企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
  scene_info: string // 该字段用于上报支付的场景信息,针对H5支付有以下三种场景,请根据对应场景上报
}

export interface ICreateUnifiedOrderReq extends ICreateUnifiedOrderOptions, IReq {
}

export interface ICreateUnifiedOrderBaseRes extends IRes {
  appid: string
  mch_id: string
  device_info?: string
  nonce_str: string
  sign: string
  return_code: 'SUCCESS'
  err_code?: string
  err_code_des?: string
}

export interface ICreateUnifiedOrderFailRes extends ICreateUnifiedOrderBaseRes {
  result_code: 'FAIL'
  err_code: string
  err_code_des: string
}

export interface ICreateUnifiedOrderSuccessRes extends ICreateUnifiedOrderBaseRes {
  result_code: 'SUCCESS'
  trade_type: TradeType
  prepay_id: string // 微信生成的预支付回话标识，用于后续接口调用中使用，该值有效期为2小时,针对H5支付此参数无特殊用途
  mweb_url: string // mweb_url为拉起微信支付收银台的中间页面，可通过访问该url来拉起微信客户端，完成支付,mweb_url的有效期为5分钟。
}

export type ICreateUnifiedOrderRes = ICreateUnifiedOrderSuccessRes | ICreateUnifiedOrderFailRes
