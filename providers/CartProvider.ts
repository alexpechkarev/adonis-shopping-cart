import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Cart from '../src/Cart'

export default class CartProvider {
  public static needsApplication = true
  constructor (protected app: ApplicationContract) {}

  public register () {
    this.app.container.singleton('Adonis/Addons/Cart', () => {
      const HttpContext = this.app.container.use('Adonis/Core/HttpContext')
      const cartConfig = this.app.container
        .use('Adonis/Core/Config')
        .get('cart', {})

      const ctx = HttpContext.get()
      const session = (ctx as any).session

      return new Cart(session, cartConfig)
    })
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
