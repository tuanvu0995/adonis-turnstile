# adonis-turnstile
AdonisJS Turnstile is a package that provides a set of tools to secure your AdonisJS applications from bots and spam attacks while also protecting your user's privacy.

[![Release](https://github.com/tuanvu0995/adonis-turnstile/actions/workflows/ci.yml/badge.svg)](https://github.com/tuanvu0995/adonis-turnstile/actions/workflows/ci.yml)

## Installation
Install and configure the package in your Adonis project.

```bash
# npm
npm i adonis-turnstile
node ace configure adonis-turnstile

# yarn
yarn add adonis-turnstile
node ace configure adonis-turnstile
```

## Usage
### Step 1: Registration
Sign up for a Cloudflare account and go to the [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) feature page. Login and follow the steps to get your site and secret key.

### Step 2: Add variables in `.env` file
```txt
TURNSTILE_SITE_KEY=YOUR_SITE_KEY
TURNSTILE_SECRET_KEY=YOUR_SECRET_KEY 
```

### Step 3: Add validation in the `.env.ts` file

```ts
import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  // ....
  TURNSTILE_SITE_KEY: Env.schema.string(),
  TURNSTILE_SECRET_KEY: Env.schema.string(),
})
```

### Step 4: Add middleware to `start/kernel.ts`

```ts
Server.middleware.registerNamed({
  // ....
  turnstile: () => import('App/Middleware/Turnstile'),
})
```

### Step 5: Add middleware to your route

```ts
Route.post('login', 'LoginController.login').middleware('turnstile')
```
### Step 6: Add the script to your client-side
Add this `turnstileScript` helper to end of your body tag. This helper will inject the script tag to your HTML.
```ts
...
{{ turnstileScript() }}
...
<body>
```
it will render like this:
```html
...
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
...
<body>
```

### Step 7: Update your form
Add this `turnstileField` helper to inside your form or anywhere that you want:
```html
....
<input type="password" name="password" />
<button type="submit">Login</button>

{{ turnstileField() }}
....
```
### Step 8: Check response in your controller

```ts
export default class LoginController {
  public async login({ turnstile, request, view }: HttpContextContract) {
    if (turnstile.success) {
      // Do some action
    }
    // Throw error
  }
}

```


## License

[MIT License](LICENSE)