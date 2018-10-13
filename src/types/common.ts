export type TradeType =
  'MWEB' // H5
  | 'JSAPI' // 公众号
  | 'NATIVE'
  | 'APP'

export type SignType =
  'HMAC-SHA256'
  | 'MD5' // 默认'MD5'

export type FeeType =
  'CNY' // 默认人民币: CNY

// 参见：https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=4_2
export type BankType = string

export type ReturnCode = 'SUCCESS' | 'FAIL'

export type ResultCode = 'SUCCESS' | 'FAIL'

export type RefundAccount =
  'REFUND_SOURCE_RECHARGE_FUNDS' // 可用余额退款/基本账户
  | 'REFUND_SOURCE_UNSETTLED_FUNDS' // 未结算资金退款

export type RefundRecvAccount =
  string // 银行卡：{银行名称}{卡类型}{卡尾号}
  | '支付用户零钱' // 退回支付用户零钱
  | '商户基本账户' | '商户结算银行账户' // 退还商户
  | '支付用户零钱通' // 退回支付用户零钱通

export type RefundStatus =
  'SUCCESS' // 退款成功
  | 'CHANGE' // 退款异常，退款到银行发现用户的卡作废或者冻结了，导致原路退款银行卡失败，可前往商户平台（pay.weixin.qq.com）-交易中心，手动处理此笔退款
  | 'REFUNDCLOSE' // 退款关闭
  | 'PROCESSING' // 退款处理中

export type RequestSource =
  'API' // 接口
  | 'VENDOR_PLATFORM' // 商户平台

export interface IReq {
  appid: string // 微信分配的公众账号ID（企业号corpid即为此appId）
  mch_id: string // 微信支付分配的商户号
  nonce_str: string // 随机字符串，不长于32位
  sign: string // 签名
  sign_type?: SignType
}

export interface IRes {
  return_code: ReturnCode
  return_msg: string
}

export interface ITransactionRes extends IRes {
  result_code: ResultCode
  err_code?: string
  err_code_des?: string
}
