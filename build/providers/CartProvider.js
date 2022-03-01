"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_1 = __importDefault(require("../src/Cart"));
class CartProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
        this.app.container.singleton('Adonis/Addons/Cart', () => {
            const HttpContext = this.app.container.use('Adonis/Core/HttpContext');
            const cartConfig = this.app.container
                .use('Adonis/Core/Config')
                .get('cart', {});
            const ctx = HttpContext.get();
            const session = ctx.session;
            return new Cart_1.default(session, cartConfig);
        });
    }
    async boot() {
        // IoC container is ready
    }
    async ready() {
        // App is ready
    }
    async shutdown() {
        // Cleanup, since app is going down
    }
}
exports.default = CartProvider;
CartProvider.needsApplication = true;
