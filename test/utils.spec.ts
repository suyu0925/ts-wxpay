import * as utils from '../src/utils'

describe('utils', () => {
  test('buildXml', () => {
    const json = {
      a: 1,
      b: '2'
    }
    const expectedXmlStr = `\
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <a>1</a>
  <b>2</b>
</root>`
    const xmlStr = utils.buildXML(json)
    expect(xmlStr).toEqual(expectedXmlStr)
  })

  test('parseXml', async () => {
    const xmlStr = `\
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <a>1</a>
  <b>2</b>
</root>`
    const json = await utils.parseXML(xmlStr)
    expect(json).toEqual({ a: '1', b: '2' })
  })

  test('generateNonceString', () => {
    const first = utils.generateNonceString(32)
    expect(first).toHaveLength(32)

    for (let i = 0; i < 10; i++) {
      const second = utils.generateNonceString(32)
      expect(first).not.toEqual(second)
    }
  })
})
