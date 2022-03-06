import { CartContract } from '@ioc:Adonis/Addons/Cart';
import { CartItem } from '@ioc:Adonis/Addons/Cart';
/**
 * Cart Class
 *
 * @class Cart
 * @constructor
 */
export default class Cart implements CartContract {
    protected session: any;
    protected cartConfig: any;
    constructor(session: any, cartConfig: any);
    /**
     * Initialise Cart Session
     */
    protected initCart(): void;
    /**
     * Format Curency
     * @param number
     * @returns
     */
    protected formatCurrency(number: number): string;
    /**
     * Get Cart Total Quantity
     * @returns
     */
    getTotalQuantity(): number;
    /**
     * Get Cart Sub total as number less VAT
     * @returns
     */
    getSubtotalNumber(): number;
    /**
     * Get Cart Sub total as formated curency string less VAT
     * @returns
     */
    getSubtotal(): string;
    /**
     * Get VAT as number
     * @returns
     */
    getVatNumber(): number;
    /**
     * Get VAT as formated currency
     * @returns
     */
    getVat(): string;
    /**
     * Set Cart shipping amount as number
     * @param shipping
     */
    setShippingAmmount(shipping: number): void;
    /**
     * Get Cart Shipping Amount as number
     * Subtotal + VAT
     *
     * @returns
     */
    getShipingNumber(): number;
    /**
     * Get Cart Shipping Amount as formated currency
     * Subtotal + VAT
     *
     * @returns
     */
    getShiping(): string;
    /**
     * Get Cart Total as number
     * Subtotal + VAT
     *
     * @returns
     */
    getTotalNumber(): number;
    /**
     * Get Cart Total as formated currency
     * Subtotal + VAT
     *
     * @returns
     */
    getTotal(): string;
    /**
     * Build unique Cart row Id
     * @param id
     * @param attributes
     * @returns
     */
    getRowId(attributes: object): string;
    /**
     * Attempt to ad an item to Cart
     * @param id
     * @param data
     */
    add(data: CartItem): void;
    /**
     * Remove item from Cart by item id
     * @param id
     */
    remove(item: CartItem): void;
    /**
     * Remove Cart items by rowId
     * @param rowId
     */
    removeByRowId(rowId: string): void;
    /**
     * Update item in Cart
     * @param id
     * @param data
     */
    update(rowId: string, data: object): void;
    /**
     * Has Cart Item for given id, match the attributes object
     * allows to add to Cart item with the same ID and different attributes
     * return true if items already in the Cart
     * @param id
     * @returns
     */
    has(rowId: string): boolean;
    /**
     * Get Cart Content
     *
     * Cart items are sorted by the rowId
     *
     * @returns
     */
    getContent(): object;
    /**
     * Clear Cart
     */
    clear(): void;
    /**
     * Build Item Object
     * @param data
     * @returns
     */
    protected buildItem(data: CartItem): {
        id: number;
        price: number;
        priceFormat: string;
        name: string;
        quantity: number;
        attributes: {};
    };
}
