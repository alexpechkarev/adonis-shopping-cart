"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
/**
 * Cart Class
 */
class Cart {
    // protected id: number
    // protected name: string
    // protected price: number
    // protected priceFormat: string
    // protected quantity: number
    // protected attributes: [key: string]
    // [key: string]: any
    constructor(session, cartConfig) {
        this.session = session;
        this.cartConfig = cartConfig;
        //console.log(this.cartConfig)
        //console.log(this.session.forget('cart'))
        if (typeof this.session.get('cart') === 'undefined') {
            this.initCart();
        }
    }
    /**
     * Initialise Cart Session
     */
    initCart() {
        this.session.put('cart', {
            shippingAmount: 0,
            vatAmount: 0,
            subTotal: 0,
            totalAmount: 0,
            totalItems: 0,
            items: {},
        });
    }
    /**
     * Format Curency
     * @param number
     * @returns
     */
    formatCurrency(number) {
        return new Intl.NumberFormat(this.cartConfig.format.locale, this.cartConfig.format.options).format(number);
    }
    /**
     * Get Cart Total Quantity
     * @returns
     */
    getTotalQuantity() {
        const items = this.getContent();
        return Object.keys(items).reduce((previous, key) => {
            return previous + parseInt(items[key].quantity);
        }, 0);
    }
    /**
     * Get Cart Sub total as number
     * @returns
     */
    getSubtotalNumber() {
        const items = this.getContent();
        return Object.keys(items).reduce((previous, key) => {
            return previous + parseInt(items[key].quantity) * parseFloat(items[key].price);
        }, 0);
    }
    /**
     * Get Cart Sub total as formated curency string
     * @returns
     */
    getSubtotal() {
        return this.formatCurrency(this.getSubtotalNumber());
    }
    /**
     * Get VAT as number
     * @returns
     */
    getVatNumber() {
        return this.getSubtotalNumber() * (parseInt(this.cartConfig.vat) / 100);
    }
    /**
     * Get VAT as formated currency
     * @returns
     */
    getVat() {
        return this.formatCurrency(this.getVatNumber());
    }
    /**
     * Get Cart Shipping Amount as number
     * Subtotal + VAT
     *
     * @returns
     */
    getShipingNumber() {
        return this.session.get('cart.shippingAmount');
    }
    /**
     * Get Cart Shipping Amount as formated currency
     * Subtotal + VAT
     *
     * @returns
     */
    getShiping() {
        return this.formatCurrency(this.getShipingNumber());
    }
    /**
     * Get Cart Total as number
     * Subtotal + VAT
     *
     * @returns
     */
    getTotalNumber() {
        return this.getSubtotalNumber() + this.getVatNumber() + this.getShipingNumber();
    }
    /**
     * Get Cart Total as formated currency
     * Subtotal + VAT
     *
     * @returns
     */
    getTotal() {
        return this.formatCurrency(this.getTotalNumber());
    }
    /**
     * Build unique Cart row Id
     * @param id
     * @param attributes
     * @returns
     */
    getRowId(attributes) {
        return crypto_1.default.createHash('sha256').update(JSON.stringify(attributes)).digest('base64');
    }
    /**
     * Attempt to ad an item to Cart
     * @param id
     * @param data
     */
    add(data) {
        //this.session.put(`cart.items.${id}`, { id: 222 })
        //console.log(data)
        let rowId = this.getRowId(data.attributes);
        //console.log(this.has(id))
        if (this.has(rowId)) {
            // update
            console.log('update item');
            this.update(rowId, this.buildItem(data));
        }
        else {
            // add row
            console.log('adding row');
            this.session.put(`cart.items.${rowId}`, this.buildItem(data));
        }
    }
    /**
     * Remove item from Cart by item id
     * @param id
     */
    remove(item) {
        let rowId = this.getRowId(item.attributes);
        //console.log('forgeting rowId ---', rowId)
        this.session.forget(`cart.items.${rowId}`);
    }
    /**
     * Remove Cart items by rowId
     * @param rowId
     */
    removeByRowId(rowId) {
        this.session.forget(`cart.items.${rowId}`);
    }
    /**
     * Update item in Cart
     * @param id
     * @param data
     */
    update(rowId, data) {
        let item = this.session.get(`cart.items.${rowId}`, {});
        this.session.forget(`cart.items.${rowId}`);
        for (let [key, value] of Object.entries(data)) {
            //console.log(key, value)
            //console.log('item - ', item[key])
            if (item.hasOwnProperty(key)) {
                if (key === 'quantity') {
                    item[key] = parseInt(value);
                }
                else {
                    item[key] = value;
                }
            }
        }
        this.session.put(`cart.items.${rowId}`, item);
    }
    /**
     * Has Cart Item for given id, match the attributes object
     * allows to add to Cart item with the same ID and different attributes
     * return true if items already in the Cart
     * @param id
     * @returns
     */
    has(rowId) {
        const cartItems = this.session.get('cart.items', {});
        const item = Object.keys(cartItems).find((key) => key === rowId);
        return typeof item !== 'undefined';
    }
    /**
     * Get Cart Content
     * @returns
     */
    getContent() {
        return this.session.get('cart.items');
    }
    /**
     * Clear Cart
     */
    clear() {
        this.session.forget('cart');
        this.initCart();
    }
    /**
     * Build Item Object
     * @param data
     * @returns
     */
    buildItem(data) {
        return {
            id: data.id,
            price: data.price,
            priceFormat: this.formatCurrency(data.price),
            name: data.name,
            quantity: data.quantity,
            attributes: data.attributes,
        };
    }
}
exports.default = Cart;
