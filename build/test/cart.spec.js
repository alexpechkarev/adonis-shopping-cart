"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const Cart_1 = __importDefault(require("../src/Cart"));
const MapStorage_1 = __importDefault(require("../src/Cart/MapStorage"));
const config = {
    CART_VAT: 20,
    format: {
        locale: 'en-GB',
        options: { style: 'currency', currency: 'GBP' },
    },
};
const session = new MapStorage_1.default(new Map());
const cart = new Cart_1.default(session, config);
let item = {
    id: 123,
    name: 'Nomad Tumbler',
    price: 12.99,
    priceFormat: '£12.99',
    quantity: 1,
    attributes: {
        image: 'https://image.url',
        color: 'white',
        size: 's',
    },
};
japa_1.default.group('Cart', () => {
    /**
     * Create Cart instance
     */
    (0, japa_1.default)('Create a Cart instance', (assert) => {
        assert.instanceOf(cart, Cart_1.default);
    });
    /**
     * Add item to the Cart
     */
    (0, japa_1.default)('Add an item to Cart', (assert) => {
        cart.add(item);
        assert.equal(cart.getTotalQuantity(), 1);
    });
    /**
     * Clear Cart
     */
    (0, japa_1.default)('Clear the  Cart', (assert) => {
        cart.clear();
        assert.equal(cart.getTotalQuantity(), 0);
    });
    /**
     * Get Cart total quantity
     */
    (0, japa_1.default)('Get Cart total quantity', (assert) => {
        item.quantity = 2;
        cart.add(item);
        assert.equal(cart.getTotalQuantity(), 2);
    });
    /**
     * Item with different attributes
     */
    (0, japa_1.default)('Add an item with different attributes', (assert) => {
        cart.clear();
        item.quantity = 1;
        item.attributes = {
            image: 'https://image.url',
            color: 'white',
            size: 'xxl',
        };
        cart.add(item);
        item.price = 24.99;
        item.attributes = {
            image: 'https://image.url',
            color: 'white',
            size: 'm',
        };
        cart.add(item);
        //console.log(Object.keys(cart.getContent()).length)
        assert.equal(Object.keys(cart.getContent()).length, 2);
    });
    /**
     * Cart sub total number
     */
    (0, japa_1.default)('Get Cart sub total number', (assert) => {
        cart.clear();
        item.quantity = 1;
        item.price = 100;
        item.attributes = {
            image: 'https://image.url',
            color: 'white',
            size: 'xxl',
        };
        cart.add(item);
        assert.equal(cart.getSubtotalNumber(), 80);
    });
    /**
     * Cart sub total formatted as string
     */
    (0, japa_1.default)('Get Cart sub total string', (assert) => {
        cart.clear();
        item.quantity = 1;
        item.price = 100;
        item.attributes = {
            image: 'https://image.url',
            color: 'white',
            size: 'xxl',
        };
        cart.add(item);
        assert.equal(cart.getSubtotal(), '£80.00');
    });
    /**
     * Cart VAT as number
     */
    (0, japa_1.default)('Get Cart VAT number', (assert) => {
        cart.clear();
        item.quantity = 1;
        item.price = 100;
        item.attributes = {
            image: 'https://image.url',
            color: 'white',
            size: 'xxl',
        };
        cart.add(item);
        assert.equal(cart.getVatNumber(), 20);
    });
    /**
     * Cart VAT formatted as string
     */
    (0, japa_1.default)('Get Cart VAT string', (assert) => {
        cart.clear();
        item.quantity = 1;
        item.price = 100;
        item.attributes = {
            image: 'https://image.url',
            color: 'white',
            size: 'xxl',
        };
        cart.add(item);
        assert.equal(cart.getVat(), '£20.00');
    });
    /**
     * Cart set shipping amount as number
     */
    (0, japa_1.default)('Get Cart set shipping amount as number', (assert) => {
        cart.clear();
        cart.setShippingAmmount(12);
        assert.equal(cart.getShipingNumber(), 12);
    });
    /**
     * Cart Shipping as formatted as string
     */
    (0, japa_1.default)('Get Cart Shipping formatted as string', (assert) => {
        cart.clear();
        cart.setShippingAmmount(12);
        assert.equal(cart.getShiping(), '£12.00');
    });
    /**
     * Cart Total as number
     */
    (0, japa_1.default)('Get Cart Total number', (assert) => {
        cart.clear();
        item.quantity = 1;
        item.price = 100;
        cart.add(item);
        assert.equal(cart.getTotalNumber(), 100);
    });
    /**
     * Cart Total formatted as string
     */
    (0, japa_1.default)('Get Cart total as string', (assert) => {
        cart.clear();
        item.quantity = 1;
        item.price = 100;
        cart.add(item);
        assert.equal(cart.getTotal(), '£100.00');
    });
    /**
     * Update item in cart
     */
    (0, japa_1.default)('Update item in cart', (assert) => {
        cart.clear();
        item.name = 'Item name';
        cart.add(item);
        item.name = 'Updated name';
        cart.add(item);
        //console.log(cart.getContent())
        assert.equal(Object.keys(cart.getContent()).length, 1);
    });
});
