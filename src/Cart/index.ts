import { CartContract } from '@ioc:Adonis/Addons/Cart'
import { CartItem } from '@ioc:Adonis/Addons/Cart'
import createHmac from 'crypto'

/**
 * Cart Class
 * 
 * @class Cart
 * @constructor
 */
export default class Cart implements CartContract {
  constructor (protected session: any, protected cartConfig: any) {
    if (typeof this.session.get('cart') === 'undefined') {
      this.initCart()
    }
  }

  /**
   * Initialise Cart Session
   */
  protected initCart (){
    this.session.put('cart', {
      shippingAmount: 0,
      vatAmount: 0,
      subTotal:0,
      totalAmount: 0,
      totalItems: 0,
      items: {},
    })
  }

  /**
   * Format Curency
   * @param number 
   * @returns 
   */
  protected formatCurrency (number:number):string {
    return new Intl.NumberFormat(this.cartConfig.format.locale, this.cartConfig.format.options).format(number)
  }

  /**
   * Get Cart Total Quantity
   * @returns 
   */
  public getTotalQuantity ():number{
    const items = this.getContent()
    return Object.keys(items).reduce((previous, key) =>{
      return previous + parseInt(items[key].quantity)
    },0)
  }

  /**
   * Get Cart Sub total as number
   * @returns 
   */
  public getSubtotalNumber ():number{
    const items = this.getContent()
    return Object.keys(items).reduce((previous, key) =>{
      return previous + parseInt(items[key].quantity) * parseFloat(items[key].price)
    },0)
  }

  /**
   * Get Cart Sub total as formated curency string
   * @returns 
   */
  public getSubtotal ():string{
    return this.formatCurrency(this.getSubtotalNumber())
  }

  /**
   * Get VAT as number
   * @returns 
   */
  public getVatNumber ():number{
    return this.getSubtotalNumber() * (parseInt(this.cartConfig.vat) / 100)
  }

  /**
   * Get VAT as formated currency
   * @returns 
   */
  public getVat ():string{
    return this.formatCurrency(this.getVatNumber())
  }

  /**
   * Get Cart Shipping Amount as number
   * Subtotal + VAT
   * 
   * @returns 
   */
  public getShipingNumber ():number{
    return this.session.get('cart.shippingAmount')
  }

  /**
   * Get Cart Shipping Amount as formated currency
   * Subtotal + VAT
   * 
   * @returns 
   */
  public getShiping ():string{
    return this.formatCurrency(this.getShipingNumber())
  }

  /**
   * Get Cart Total as number
   * Subtotal + VAT
   * 
   * @returns 
   */
  public getTotalNumber ():number{
    return this.getSubtotalNumber() + this.getVatNumber() + this.getShipingNumber()
  }

  /**
   * Get Cart Total as formated currency
   * Subtotal + VAT
   * 
   * @returns 
   */
  public getTotal ():string{
    return this.formatCurrency(this.getTotalNumber())
  }

  /**
   * Build unique Cart row Id
   * @param id
   * @param attributes
   * @returns
   */
  public getRowId (attributes: object): string {
    return createHmac.createHash('sha256').update(JSON.stringify(attributes)).digest('base64')
  }

  /**
   * Attempt to ad an item to Cart
   * @param id
   * @param data
   */
  public add (data:CartItem): void {
    //this.session.put(`cart.items.${id}`, { id: 222 })
    //console.log(data)
    let rowId = this.getRowId(data.attributes)

    //console.log(this.has(id))
    if (this.has(rowId)) {
      // update
      console.log('update item')
      this.update(rowId, this.buildItem(data))
    } else {
      // add row
      console.log('adding row')
      this.session.put(`cart.items.${rowId}`, this.buildItem(data))
    }
  }

  /**
   * Remove item from Cart by item id
   * @param id
   */
  public remove (item: CartItem): void {
    let rowId = this.getRowId(item.attributes)
    //console.log('forgeting rowId ---', rowId)
    this.session.forget(`cart.items.${rowId}`)
  }

  /**
   * Remove Cart items by rowId
   * @param rowId 
   */
  public removeByRowId (rowId:string){
    this.session.forget(`cart.items.${rowId}`)
  }

  /**
   * Update item in Cart
   * @param id
   * @param data
   */
  public update (rowId: string, data: object): void {
    let item = this.session.get(`cart.items.${rowId}`, {})
    this.session.forget(`cart.items.${rowId}`)
    for (let [key, value] of Object.entries(data)) {
      //console.log(key, value)
      //console.log('item - ', item[key])
      if (item.hasOwnProperty(key)) {
        if(key === 'quantity'){
          item[key] = parseInt(value)
        }else{
          item[key] = value
        }
      }
    }
    this.session.put(`cart.items.${rowId}`, item)
  }

  /**
   * Has Cart Item for given id, match the attributes object
   * allows to add to Cart item with the same ID and different attributes
   * return true if items already in the Cart
   * @param id
   * @returns
   */
  public has (rowId: string): boolean {
    const cartItems = this.session.get('cart.items', {})
    const item = Object.keys(cartItems).find((key): boolean => key === rowId)
    return typeof item !== 'undefined'
  }

  /**
   * Get Cart Content
   * @returns
   */
  public getContent (): object {
    return this.session.get('cart.items')
  }

  /**
   * Clear Cart
   */
  public clear () {
    this.session.forget('cart')
    this.initCart()
  }

  /**
   * Build Item Object
   * @param data 
   * @returns 
   */
  protected buildItem (data:CartItem) {
    return {
      id: data.id,
      price: data.price,
      priceFormat: this.formatCurrency(data.price),
      name: data.name,
      quantity: data.quantity,
      attributes: data.attributes,
    }
  }
}
