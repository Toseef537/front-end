import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cart } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/common/services/website/cart.service';
import { CartItem } from 'src/app/shared/models/items';
import { RouterLink } from '@angular/router';
import { NotFoundComponent } from 'src/app/common/components/not-found/not-found.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule,RouterLink,NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService) {
    cartService.getCartObservable().subscribe((cartItems) => {
      this.cart = cartItems;
    })
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    let quantity = parseInt(quantityInString);
    console.log('cartItem',quantity);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
