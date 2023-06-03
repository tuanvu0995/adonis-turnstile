import { test } from '@japa/runner'
import nock from 'nock'
import { chance, successResponse, turnstileNock } from './utils'
import Turnstile from '../src/Turnstile'

test.group('Turnstile', (group) => {
  nock.disableNetConnect()

  const secretKey = chance.guid()
  const siteKey = chance.guid()
  const turnstile = new Turnstile({ secretKey, siteKey })

  test('should be able to verify the token', async ({ assert }) => {
    const token = chance.guid()
    const ip = '127.0.0.1'
    const mockContext = {
      request: {
        input: (_: string) => token,
        header: (_: string) => ip,
      },
    }

    turnstileNock(secretKey, ip, token, 200, successResponse)

    const response = await turnstile.check(mockContext as any)

    assert.isDefined(response)
    assert.isObject(response)
    assert.deepEqual(response, successResponse)
    assert.isTrue(nock.isDone())
  })

  group.each.setup(async () => nock.cleanAll())
})
