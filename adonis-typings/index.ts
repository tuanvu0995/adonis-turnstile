/*
 * adonis-turnstile
 *
 * (c) Vu Lai <tuanvu0995@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

declare module '@ioc:Turnstile' {
  export interface TurnstileConfig {
    siteKey: string
    secretKey: string
  }

  export interface TurnstileResponse {
    /** True when the token is valid */
    readonly success: boolean

    /** Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ) */
    readonly challengeTimestamp?: string

    /** the hostname of the site where the challenge was solved */
    readonly hostname?: string

    /** optional error codes */
    readonly errorCodes?: TurnstileErrorCode[]

    /** action to perform */
    readonly action?: string

    /** custom data to be sent back */
    readonly cdata?: string
  }

  export type TurnstileErrorCode =
    | 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'invalid-sitekey'
    | 'invalid-remoteip'
    | 'bad-request'
    | 'invalid-or-already-seen-response'
    | 'not-using-dummy-passcode'
    | 'not-using-dummy-secret'
    | 'sitekey-secret-mismatch'

  import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
  export interface TurnstileContract {
    check(ctx: HttpContextContract): Promise<TurnstileResponse>
  }

  const Turnstile: TurnstileContract
  export default Turnstile
}
