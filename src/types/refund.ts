import { IReq, ITransactionRes } from './common'
import { FeeType, RefundAccount, RefundStatus, RequestSource } from './common'

export interface IRefundOptions {
  transaction_id?: string // 和out_trade_no二选一
  out_trade_no?: string // 和transaction_id二选一
  out_refund_no: string // 商户系统内部的退款单号，商户系统内部唯一
  total_fee: number // 订单总金额，单位为分，只能为整数
  refund_fee: number // 退款总金额，订单总金额，单位为分，只能为整数
  refund_fee_type?: FeeType // 退款货币种类
  refund_desc?: string // 若商户传入，会在下发给用户的退款消息中体现退款原因
  refund_account?: RefundAccount // 退款资金来源。仅针对老资金流商户使用，默认使用未结算金额
  notify_url?: string // 异步接收微信支付退款结果通知的回调地址，通知URL必须为外网可访问的url，不允许带参数
  // 如果参数中传了notify_url，则商户平台上配置的回调地址将不会生效
}

export interface IRefundReq extends IReq, IRefundOptions {
}

export interface IRefundRes extends ITransactionRes {
  result_code: 'SUCCESS' // 退款申请接收成功，结果通过退款查询接口查询
  | 'FAIL' // 提交业务失败

  appid: string
  mch_id: string
  nonce_str: string
  sign: string // 使用MD5算法

  transaction_id: string // 微信订单号
  out_trade_no: string // 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
  out_refund_no: string // 商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔
  refund_id: string // 微信退款单号
  refund_fee: number // 退款总金额,单位为分
  settlement_refund_fee?: number // 退款金额=申请退款金额-非充值代金券退款金额，退款金额<=申请退款金额
  total_fee: number // 订单总金额，单位为分，只能为整数
  settlement_total_fee?: number // 去掉非充值代金券金额后的订单总金额，应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额
  fee_type?: FeeType

  cash_fee: number // 现金支付金额，单位为分，只能为整数
  cash_fee_type?: FeeType
  cash_refund_fee?: number // 现金退款金额，单位为分，只能为整数

  coupon_type_$n?: 'CASH' | 'NO_CASH' // 代金券类型
  coupon_refund_fee?: number // 代金券退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金
  coupon_refund_fee_$n?: number // 代金券退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金
  coupon_refund_count?: number // 退款代金券使用数量
  coupon_refund_id_$n?: string // 退款代金券ID, $n为下标，从0开始编号
}
