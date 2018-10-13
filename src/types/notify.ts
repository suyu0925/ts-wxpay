import {
  BankType, FeeType,
  RefundAccount, RefundRecvAccount, RefundStatus, RequestSource,
  ResultCode, SignType, TradeType
} from './common'

export interface INotify {
  return_code: 'SUCCESS'
  return_msg: 'OK'
}

// 重要数据加密的通知
export interface IcrypticNotify extends INotify {
  appid: string
  mch_id: string
  nonce_str: string
  req_info: string
}

// 举例如下：
// <xml>
//   <appid><![CDATA[wx2421b1c4370ec43b]]></appid>
//   <attach><![CDATA[支付测试]]></attach>
//   <bank_type><![CDATA[CFT]]></bank_type>
//   <fee_type><![CDATA[CNY]]></fee_type>
//   <is_subscribe><![CDATA[Y]]></is_subscribe>
//   <mch_id><![CDATA[10000100]]></mch_id>
//   <nonce_str><![CDATA[5d2b6c2a8db53831f7eda20af46e531c]]></nonce_str>
//   <openid><![CDATA[oUpF8uMEb4qRXf22hE3X68TekukE]]></openid>
//   <out_trade_no><![CDATA[1409811653]]></out_trade_no>
//   <result_code><![CDATA[SUCCESS]]></result_code>
//   <return_code><![CDATA[SUCCESS]]></return_code>
//   <sign><![CDATA[B552ED6B279343CB493C5DD0D78AB241]]></sign>
//   <sub_mch_id><![CDATA[10000100]]></sub_mch_id>
//   <time_end><![CDATA[20140903131540]]></time_end>
//   <total_fee>1</total_fee>
// <coupon_fee_0><![CDATA[10]]></coupon_fee_0>
// <coupon_count><![CDATA[1]]></coupon_count>
// <coupon_type><![CDATA[CASH]]></coupon_type>
// <coupon_id><![CDATA[10000]]></coupon_id>
//   <trade_type><![CDATA[JSAPI]]></trade_type>
//   <transaction_id><![CDATA[1004400740201409030005092168]]></transaction_id>
// </xml>
export interface IPayNotify extends INotify {
  appid: string // 微信分配的公众账号ID（企业号corpid即为此appId）
  mch_id: string // 微信支付分配的商户号
  device_info?: string // 微信支付分配的终端设备号
  nonce_str: string // 随机字符串，不长于32位
  sign: string // 签名
  sign_type: SignType

  result_code: ResultCode
  err_code?: string // 错误返回的信息描述
  err_code_des?: string // 错误返回的信息描述

  openid: string // 用户在商户appid下的唯一标识
  is_subscribe?: 'Y' | 'N' // 用户是否关注公众账号，Y-关注，N-未关注，仅在公众账号类型支付有效
  trade_type: TradeType
  bank_type: BankType // 银行类型，采用字符串类型的银行标识
  total_fee: number // 订单总金额，单位为分
  settlement_total_fee?: number // 应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额
  fee_type?: FeeType // 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY
  cash_fee: number // 现金支付金额订单现金支付金额
  cash_fee_type?: FeeType // 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY
  coupon_fee?: number // 代金券金额<=订单金额，订单金额-代金券金额=现金支付金额
  coupon_count?: number // 代金券使用数量
  coupon_type_0?: 'CASH' | 'NO_CASH' // CASH--充值代金券, NO_CASH---非充值代金券,
  // 并且订单使用了免充值券后有返回（取值：CASH、NO_CASH）。$n为下标,从0开始编号，举例：coupon_type_0
  coupon_id_0?: string // 代金券ID,$n为下标，从0开始编号
  coupon_fee_0?: string // 单个代金券支付金额,$n为下标，从0开始编号

  transaction_id: string // 微信支付订单号
  out_trade_no: string // 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
  attach?: string // 商家数据包，原样返回
  time_end: string // 支付完成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010
}

// 详细定义参见：https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_16&index=10
export interface IRefundNotify extends IcrypticNotify {
  transaction_id: string // 微信订单号
  out_trade_no: string // 商户系统内部的订单号
  refund_id: string // 微信退款单号
  out_refund_no: string // 商户退款单号
  total_fee: number // 订单总金额，单位为分，只能为整数
  settlement_total_fee?: number // 当该订单有使用非充值券时，返回此字段。应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额
  refund_fee: number // 退款总金额,单位为分
  settlement_refund_fee: number // 退款金额=申请退款金额-非充值代金券退款金额，退款金额<=申请退款金额
  refund_status: RefundStatus // 退款状态
  success_time?: string // 资金退款至用户帐号的时间，格式2017-12-15 09:46:01
  refund_recv_accout: RefundRecvAccount // 取当前退款单的退款入账方
  refund_account: RefundAccount // 退款资金来源
  refund_request_source: RequestSource // 退款发起来源
}
