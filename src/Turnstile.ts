import axios from 'axios'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TurnstileConfig, TurnstileErrorCode, TurnstileResponse } from '@ioc:Turnstile'

interface CfTurnstileResponse {
  'success': boolean
  'challenge_ts': string
  'hostname': string
  'error-codes': TurnstileErrorCode[]
  'action': string
  'cdata': string
}

export default class Turnstile {
  constructor(protected readonly config: TurnstileConfig) {}

  public async check(ctx: HttpContextContract): Promise<TurnstileResponse> {
    const token = ctx.request.input('cf-turnstile-response')
    const ip = ctx.request.header('cf-connecting-ip')

    const { data } = await axios.post<CfTurnstileResponse>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        secret: this.config.secretKey,
        response: token,
        remoteip: ip,
      }
    )

    return {
      success: Boolean(data.success),
      challengeTimestamp: data.challenge_ts,
      hostname: data.hostname,
      errorCodes: data['error-codes'],
      action: data.action,
      cdata: data.cdata,
    } as TurnstileResponse
  }
}
