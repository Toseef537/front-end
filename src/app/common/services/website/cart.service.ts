import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/shared/models/cart';
import { IFood } from 'src/app/shared/models/food';
import { CartItem } from 'src/app/shared/models/items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = this.getCartFromLocalStorage();
  cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  /**
 * Adding Food to cart
 */
  addToCart(food: IFood): void {
    let cartItem = this.cart.items.find(item => item.food.id == food.id);
    if (cartItem) return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: any): void {
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStorage();

  }

  /**
  * Changing quantity of food added to cart
  */
  changeQuantity(foodId: any, quantity: number) {
    console.log('cartItem', quantity);
    let cartItem = this.cart.items.find((item) => {
      return item.food.id === foodId
    });
    console.log('finded cartItem', cartItem);

    if (!cartItem) return;
    else {
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.food.price;
    }
    this.setCartToLocalStorage();
    console.log('cart after quantity change', this.cart);

  }

  /**
  * Clearing cart from loacl storage and service
  */
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();

  }

  /**
 * Getting  Cart as an observable
 */
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }


  /**
   * Getting  Cart
   */
  get currentcart(): Cart {
    return this.cartSubject.value;
  }

  /**
   * Saving Cart data to local storage
   */

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItems) => prevSum + currentItems.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItems) => prevSum + currentItems.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  /**
   * Getting Cart data t=from local storage
   */
  private getCartFromLocalStorage(): Cart {
    let cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
