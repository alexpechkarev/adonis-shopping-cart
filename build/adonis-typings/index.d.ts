declare module '@ioc:Adonis/Addons/Cart' {
  export type CartConfig = {
    vat: number,
    format:{
      locale: string,
      options: { style: string, currency: string },
    },
  }

  export type CartItem = {
    id: number;
    name: string;
    price: number;
    priceFormat: string;
    quantity: number;
    attributes: [key: string];
    [key: string]: any;
  }
  export interface CartContract {
    getRowId(attributes: object): string;

    /**
     * Add an Item to Cart
     * @param id
     * @param name
     * @param price
     * @param quantity
     * @param attributes
     */
    add(data: object): void;
    /**
     * Remove Cart Item By Id
     * @param id
     */
    remove(item: object): void;
    /**
     * Has Cart item with the given id
     * @param id
     */
    has(rowId: string): boolean;
    /**
     * Get Cart Items Content
     */
    getContent(): object;
    getSubtotal():string;
    getSubtotalNumber():number;
    getShiping(): string;
    getShipingNumber():number;
    getVat():string;
    getVatNumber():number;
    getTotal():string;
    getTotalNumber():number;
    getTotalQuantity():number;
    removeByRowId(rowId:string):void;
  }

  const Cart: CartContract
  export default Cart
}
