import nock from 'nock'
import { Chance } from 'chance'
import { TurnstileResponse } from '@ioc:Turnstile'

const host = 'https://challenges.cloudflare.com'
const path = '/turnstile/v0/siteverify'
type ResponseCode = 200 | 400 | 500

export const chance = new Chance()

export const turnstileNock = (
  secretKey: string,
  ip: string,
  token: string,
  responseCode: ResponseCode,
  response: TurnstileResponse
) =>
  nock(host)
    .matchHeader('Content-Type', 'application/json')
    .post(path, {
      secret: secretKey,
      response: token,
      remoteip: ip,
    })
    .reply(responseCode, {
      'success': response.success,
      'challenge_ts': response.challengeTimestamp,
      'hostname': response.hostname,
      'error-codes': response.errorCodes,
      'cdata': response.cdata,
    })

export const successResponse: TurnstileResponse = {
  success: true,
  challengeTimestamp: '2021-11-06T07:32:21.000000Z',
  hostname: chance.domain(),
  errorCodes: undefined,
  action: undefined,
  cdata: 'session-abc',
}
