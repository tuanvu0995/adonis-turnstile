import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { TurnstileConfig } from '@ioc:Turnstile'
import Turnstile from '../src/Turnstile'

export default class AdonisTurnstileProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  private getConfig(): TurnstileConfig {
    const Env = this.app.container.use('Adonis/Core/Env')
    return this.app.container.use('Adonis/Core/Config').get('turnstile', {
      siteKey: Env.get('TURNSTILE_SITE_KEY'),
      secretKey: Env.get('TURNSTILE_SECRET_KEY'),
    })
  }

  public register() {
    this.app.container.singleton('Turnstile', () => new Turnstile(this.getConfig()))
  }

  public async boot() {
    const View = await this.app.container.use('Adonis/Core/View')
    const { siteKey } = this.getConfig()

    View.global('turnstileField', () => {
      return View.GLOBALS.safe(
        `<div class="cf-turnstile" data-sitekey="${siteKey}" data-callback="javascriptCallback"></div>`
      )
    })

    View.global('turnstileScript', () => {
      return View.GLOBALS.safe(
        `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
      )
    })
  }

  public async ready() {}

  public async shutdown() {}
}
