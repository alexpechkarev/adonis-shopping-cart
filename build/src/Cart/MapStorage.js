"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapStorage {
    constructor(session) {
        this.session = session;
    }
    /**
     * Get Cart Parameter
     * @param param
     * @returns
     */
    get(param) {
        //console.log('calling get()')
        /**
           * split the parameters string
           * cart
           * cart.shippingAmount
           * cart.items.rowid
           */
        const [...option] = param.split('.');
        //console.log(option)
        // has cart declared
        if (typeof option[1] === 'undefined' && typeof option[2] === 'undefined') {
            return this.session.get('cart');
            // is this a second level parameter
        }
        else if (typeof option[1] !== 'undefined' && typeof option[2] === 'undefined') {
            const store = this.session.get('cart');
            //console.log(store)
            return store[option[1]];
            // is this items parameter
        }
        else if (typeof option[1] !== 'undefined' && typeof option[2] !== 'undefined') {
            const store = this.session.get('cart');
            return store[option[1]][option[2]];
        }
    }
    /**
     * Store Cart parameter
     * @param param
     * @param item
     */
    put(param, item) {
        //console.log('putting an items', item)
        /**
           * split the parameters string
           * cart
           * cart.shippingAmount
           * cart.items.rowid
           */
        const [...option] = param.split('.');
        //console.log(option, item)
        // has cart declared
        if (!this.session.has('cart')) {
            this.session.set('cart', item);
            // is this a second level parameter
        }
        else if (typeof option[1] !== 'undefined' && typeof option[2] === 'undefined') {
            let obj = this.session.get('cart');
            obj[option[1]] = item;
            this.session.set('cart', obj);
            // is this items parameter
        }
        else {
            let obj = this.session.get('cart');
            obj.items[option[2]] = item;
            this.session.set('cart', obj);
        }
    }
    /**
     * Delete Cart parameter
     * @param param
     */
    forget(param) {
        /**
           * split the parameters string
           * cart
           * cart.shippingAmount
           * cart.items.rowid
           */
        const [...option] = param.split('.');
        //console.log(option, item)
        // delete Cart
        if (typeof option[1] === 'undefined' && typeof option[2] === 'undefined') {
            this.session.delete('cart');
            // is this a second level parameter
        }
        else if (typeof option[1] !== 'undefined' && typeof option[2] === 'undefined') {
            let obj = this.session.get('cart');
            this.session.delete('cart');
            delete obj[option[1]];
            this.session.set('cart', obj);
            // is this items parameter
        }
        else {
            let obj = this.session.get('cart');
            //console.log(obj)
            this.session.delete('cart');
            delete obj.items[option[2]];
            //console.log('after deleting an item...',obj)
            this.session.set('cart', obj);
        }
    }
}
exports.default = MapStorage;
