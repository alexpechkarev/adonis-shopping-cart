# Adonis Shopping Cart

Basic Shopping Cart functionality for AdonisJS v5

## Requirements

The Cart is using `@adonisjs/session` to store the data, please ensure you have this package installed and configured.

## Installation

````bash
# npm
npm i adonis-shopping-cart
````

Register and configure package with AdonisJS

````bash
# npm
node ace configure adonis-shopping-cart
````
![Adinis Shopping Cart](adonis-shopping-cart.gif)



Update variable value in `.env` file of your project, the default `CART_VAT` is 20%.
Assume that the VAT is already included in the item price.
Example: 
Item price: £100.00
Sub total: £80.00
Vat: £20.00 (based on 20% VAT rate)
Total: £100.00


```bash

CART_VAT=20
```

Number format Locale and Options can be specified in `config/cart.ts`

```js
// default format values
  format:{
    locale: 'en-GB',
    options: { style: 'currency', currency: 'GBP' },
  },
```


## How to use

Cart accepts items of `CartItem` Type

```js
{
    id: number;
    name: string;
    price: number;
    priceFormat: string;
    quantity: number;
    attributes: [key: string];
}

{
    id: 1234,
    name: 'Classic T-Shirt',
    price: 21.99,
    priceFormat: '£21.99',
    quantity: 1,
    attributes: {
        image: 'https://image.url',
        color: 'white',
        size: 'M',
        // more attributes
      }
}
```

### Adding an item to the Cart

Cart creates unique rowId for each item by hashing `item.attributes` object allowing to distinguish items with the different atributes, for eaxmple:

- Classic T-Shirt color: White and size:M
  is a different item to
- Classic T-Shirt color: White and size:M

To update an item in the Cart use `add` method, it will find the item in the Cart and update it or create a new item

```js

Cart.add(item);

```

### Upading item
```js

  let rowId = "lcoLo4tYTGnCn9pqnSgRLqeYV/KAbgDtfXeRUwRL24k=";
  let item ={
    "id": 1,
    "price": 22.5,
    "priceFormat": "£22.50",
    "name": "A green door",
    "quantity": 4,
    "attributes": {
      "image": "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
      "color": "sky",
      "size": "s"
    }

Cart.update(rowId:string, item:CartItem);

```

### Removing an item

```js

Cart.remove(item);

//or

Cart.removeByRowId(rowId);

```

### Getting Cart content

```js

Cart.getContent()


{
  "lcoLo4tYTGnCn9pqnSgRLqeYV/KAbgDtfXeRUwRL24k=": { // rowId
    "id": 1,
    "price": 22.5,
    "priceFormat": "£22.50",
    "name": "A green door",
    "quantity": 4,
    "attributes": {
      "image": "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
      "color": "sky",
      "size": "s"
    }
  },
  "fLBUy2jj8rI1KcBvI0G2MV1nPD2pkoySPUeBjIp6U30=": { // rowId
    "id": 2,
    "price": 24.5,
    "priceFormat": "£24.50",
    "name": "Basic Tee",
    "quantity": 1,
    "attributes": {
      "image": "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
      "color": "pink",
      "size": "s"
    }
  }
}


```


### Other Methods

```js

// has Cart given item
Cart.has(rowId:string):boolean

// Shipping Amount
Cart.setShippingAmmount(10): void   
Cart.getShiping():string            // "£10.00"
Cart.getShipingNumber():number      // 10

// subTotal - (subTotal * VAT)
Cart.getSubtotal(): string          // "£22.50"

//subTotal * VAT
Cart.getVat():string                // "£4.50"
Cart.getVatNumber():number          // 4.50 

// subTotal + VAT + Shipping
Cart.getTotal():string              // "£27.00"
Cart.getTotalNumber():number        // 27 

// calculate quantity of all items in Cart
Cart.getTotalQuantity():number      // 1

```

### Including Cart in your Controller or Service

```js
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from '@ioc:Adonis/Addons/Cart'

export default class CartController {

  public async add({ request }: HttpContextContract) {
    let data = request.body()
    Cart.add(data)
    ...
}
```

### Test

```js
npm run clean
npm run test
```