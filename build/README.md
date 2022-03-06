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


Add a variables to `.env` file of project and set the VAT value, default is 20%.
The VAT calculations assume the VAT is already included in the item price.
Example: 
Item price: £100.00
Sub total: £80.00
Vat: £20.00 (based on 20% VAT rate)
Total: £100.00


```bash

CAR_VAT=20
````

Number format Locale and Options can be specified in `config/cart.ts`

```bash
// default values
  format:{
    locale: 'en-GB',
    options: { style: 'currency', currency: 'GBP' },
  },
```


## How to use

`CartItem` Type

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

Adding an item to the Cart

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

Cart creates unique rowId for each item by hashing `item.attributes` object allowing to distinguish items with the different atributes, for eaxmple:

- Classic T-Shirt color: White and size:M
  is a different item to
- Classic T-Shirt color: White and size:M

To update an item in the Cart use `add` method, it will find the item in the Cart and update it or create a new item

```js
Cart.add(item);
```

Removing an item

```js
Cart.remove(item);
//or
Cart.removeByRowId(rowId);
```

Gettting Cart content

```js

Cart.getContent()


{
  "lcoLo4tYTGnCn9pqnSgRLqeYV/KAbgDtfXeRUwRL24k=": {
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
  "fLBUy2jj8rI1KcBvI0G2MV1nPD2pkoySPUeBjIp6U30=": {
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


Other Methods

```js

Cart.getSubtotal()  // "£22.50"
Cart.getShiping()   // "£0.00"
Cart.getVat()       // "£4.50"
Cart.getTotal()     // "£27.00"
Cart.getTotalQuantity() // 1

```