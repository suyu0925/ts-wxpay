import { IReq, ITransactionRes } from './common'
import { FeeType, RefundAccount, RefundRecvAccount, RefundStatus } from './common'

export interface IRefundQueryOptions {
  // 四选一，微信订单号查询的优先级是： refund_id > out_refund_no > transaction_id > out_trade_no
  transaction_id?: string // 微信订单号
  out_trade_no?: string // 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一
  out_refund_no?: string // 商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔
  refund_id?: string // 微信生成的退款单号，在申请退款接口有返回

  offset?: number // 偏移量，当部分退款次数超过10次时可使用，表示返回的查询结果从这个偏移量开始取记录
}

export interface IRefundQueryReq extends IReq, IRefundQueryOptions {
}

export type RefundChannel =
  'ORIGINAL' // 原路退款
  | 'BALANCE' // 退回到余额
  | 'OTHER_BALANCE' // 原账户异常退到其他余额账户
  | 'OTHER_BANKCARD' // 原银行卡异常退到其他银行卡

export interface IRefundQueryRes extends ITransactionRes {
  appid: string
  mch_id: string
  nonce_str: string
  sign: string

  total_refund_count?: number // 订单总共已发生的部分退款次数，当请求参数传入offset后有返回

  transaction_id: string
  out_trade_no: string

  total_fee: string
  settlement_total_fee?: number
  fee_type?: FeeType
  cash_fee: number

  refund_count: number // 当前返回退款笔数
  out_refund_no_$n: string
  refund_id_$n: string
  refund_channel_$n: RefundChannel // 退款渠道
  refund_fee_$n: number // 申请退款金额
  settlement_refund_fee_$n?: number // 退款金额

  // 代金券相关
  coupon_type_$n?: 'CASH' | 'NO_CASH'
  coupon_refund_fee_$n?: number
  coupon_refund_count_$n?: number
  coupon_refund_id_$n_$m?: string
  coupon_refund_fee_$n_$m?: number

  refund_status_$n: RefundStatus // 。$n为下标，从0开始编号
  refund_account_$n?: RefundAccount // $n为下标，从0开始编号
  refund_recv_accout_$n: RefundRecvAccount // 退款入账账户，$n为下标，从0开始编号
  refund_success_time_$n?: string // 退款成功时间，当退款状态为退款成功时有返回。$n为下标，从0开始编号。示例：2016-07-25 15:26:26
}
