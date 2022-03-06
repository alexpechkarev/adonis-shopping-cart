"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStorage_1 = __importDefault(require("./src/Cart/LocalStorage"));
const ls = new LocalStorage_1.default({});
// let item = {
//     id: 123,
//     name: 'Nomad Tumbler',
//     price: 12.99,
//     priceFormat: '£12.99',
//     quantity: 1,
//     attributes: {
//       image: 'https://image.url',
//       color: 'white',
//       size: 's',
//     },
//   }
console.log(ls);
//ls.setItem('new_item_id', item)
