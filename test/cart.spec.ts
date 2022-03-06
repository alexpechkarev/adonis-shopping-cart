import { CartItem } from '@ioc:Adonis/Addons/Cart'
import test from 'japa'
import Cart from '../src/Cart'
import MapStorage from '../src/Cart/MapStorage'

const config = {
  CART_VAT: 20,
  format: {
    locale: 'en-GB',
    options: { style: 'currency', currency: 'GBP' },
  },
}

const session = new MapStorage(new Map())
const cart = new Cart(session, config)
let item: CartItem = {
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
}

test.group('Cart', () => {
  /**
   * Create Cart instance
   */
  test('Create a Cart instance', (assert) => {
    assert.instanceOf(cart, Cart)
  })

  /**
   * Add item to the Cart
   */
  test('Add an item to Cart', (assert) => {
    cart.add(item)
    assert.equal(cart.getTotalQuantity(), 1)
  })

  /**
   * Clear Cart
   */
  test('Clear the  Cart', (assert) => {
    cart.clear()
    assert.equal(cart.getTotalQuantity(), 0)
  })

  /**
   * Get Cart total quantity
   */
  test('Get Cart total quantity', (assert) => {
    item.quantity = 2
    cart.add(item)
    assert.equal(cart.getTotalQuantity(), 2)
  })

  /**
   * Item with different attributes
   */
  test('Add an item with different attributes', (assert) => {
    cart.clear()
    item.quantity = 1
    item.attributes = {
      image: 'https://image.url',
      color: 'white',
      size: 'xxl',
    }
    cart.add(item)

    item.price = 24.99
    item.attributes = {
      image: 'https://image.url',
      color: 'white',
      size: 'm',
    }
    cart.add(item)
    //console.log(Object.keys(cart.getContent()).length)
    assert.equal(Object.keys(cart.getContent()).length, 2)
  })

  /**
   * Cart sub total number
   */
  test('Get Cart sub total number', (assert) => {
    cart.clear()
    item.quantity = 1
    item.price = 100
    item.attributes = {
      image: 'https://image.url',
      color: 'white',
      size: 'xxl',
    }
    cart.add(item)
    assert.equal(cart.getSubtotalNumber(), 80)
  })

  /**
   * Cart sub total formatted as string
   */
  test('Get Cart sub total string', (assert) => {
    cart.clear()
    item.quantity = 1
    item.price = 100
    item.attributes = {
      image: 'https://image.url',
      color: 'white',
      size: 'xxl',
    }
    cart.add(item)
    assert.equal(cart.getSubtotal(), '£80.00')
  })

  /**
   * Cart VAT as number
   */
  test('Get Cart VAT number', (assert) => {
    cart.clear()
    item.quantity = 1
    item.price = 100
    item.attributes = {
      image: 'https://image.url',
      color: 'white',
      size: 'xxl',
    }
    cart.add(item)
    assert.equal(cart.getVatNumber(), 20)
  })

  /**
   * Cart VAT formatted as string
   */
  test('Get Cart VAT string', (assert) => {
    cart.clear()
    item.quantity = 1
    item.price = 100
    item.attributes = {
      image: 'https://image.url',
      color: 'white',
      size: 'xxl',
    }
    cart.add(item)
    assert.equal(cart.getVat(), '£20.00')
  })

  /**
   * Cart set shipping amount as number
   */
  test('Get Cart set shipping amount as number', (assert) => {
    cart.clear()
    cart.setShippingAmmount(12)
    assert.equal(cart.getShipingNumber(), 12)
  })

  /**
   * Cart Shipping as formatted as string
   */
  test('Get Cart Shipping formatted as string', (assert) => {
    cart.clear()
    cart.setShippingAmmount(12)
    assert.equal(cart.getShiping(), '£12.00')
  })

  /**
   * Cart Total as number
   */
  test('Get Cart Total number', (assert) => {
    cart.clear()
    item.quantity = 1
    item.price = 100
    cart.add(item)
    assert.equal(cart.getTotalNumber(), 100)
  })

  /**
   * Cart Total formatted as string
   */
  test('Get Cart total as string', (assert) => {
    cart.clear()
    item.quantity = 1
    item.price = 100
    cart.add(item)
    assert.equal(cart.getTotal(), '£100.00')
  })

  /**
   * Update item in cart
   */
  test('Update item in cart', (assert) => {
    cart.clear()
    item.name = 'Item name'
    cart.add(item)
    item.name = 'Updated name'
    cart.add(item)
    //console.log(cart.getContent())
    assert.equal(Object.keys(cart.getContent()).length, 1)
  })
})
