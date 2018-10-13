import * as dotenv from 'dotenv'
import WxPay from '../src/index'

dotenv.config()
const logger = console

describe('index', () => {
  let wxpay: WxPay

  beforeAll(() => {
    const config = {
      appid: process.env.appid,
      partner_key: process.env.partner_key,
      mch_id: process.env.mch_id,
      cert: process.env.cert.replace(/\\n/g, '\n'),
      key: process.env.key.replace(/\\n/g, '\n')
    }
    wxpay = new WxPay(config)
  })

  test('createUnifiedOrder', async () => {
    const opts = {
      body: '测试用商品描述',
      out_trade_no: 'TEST_' + Date.now() + Math.floor((Math.random() * 1000)),
      total_fee: 1,
      spbill_create_ip: '127.0.0.1',
      notify_url: 'http://test.com',
      trade_type: 'MWEB' as 'MWEB',
      scene_info: JSON.stringify({
        h5_info: {
          type: 'Wap',
          wap_url: 'http://test.com',
          wap_name: 'test'
        }
      })
    }
    const res = await wxpay.createUnifiedOrder(opts)
    logger.info('create unified order', JSON.stringify(res))
    expect(res.return_code).toEqual('SUCCESS')
  })

  test.skip('refund', async () => {
    // TODO:
  })

  test.skip('refundQuery', async () => {
    const opts = {
      out_trade_no: '201810046520'
    }
    const res = await wxpay.refundQuery(opts)
    logger.info('refund query', JSON.stringify(res))
    expect(res.return_code).toEqual('SUCCESS')
  })
})
