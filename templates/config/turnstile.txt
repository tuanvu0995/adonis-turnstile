import Env from '@ioc:Adonis/Core/Env'
import { TurnstileConfig } from '@ioc:Turnstile'

const Turnstile: TurnstileConfig = {
  /*
  |--------------------------------------------------------------------------
  | Site Key
  |--------------------------------------------------------------------------
  |
  | Your public Site site key
  |
  */
  siteKey: Env.get('TURNSTILE_SITE_KEY'),

  /*
  |--------------------------------------------------------------------------
  | Secret Key
  |--------------------------------------------------------------------------
  |
  | Your Secret Key 
  | * Do not share your secretKey with anyone
  |
  */
  secretKey: Env.get('TURNSTILE_SECRET_KEY'),
}
export default Turnstile
