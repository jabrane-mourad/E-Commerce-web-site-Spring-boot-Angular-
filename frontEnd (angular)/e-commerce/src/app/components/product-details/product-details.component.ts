import {Component, OnInit} from '@angular/core';
import {Product} from "../../common/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  addToCart(product: Product) {
    const cartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);

  }

  private handleProductDetails() {
    const theProductId: number = +this.router.snapshot.paramMap.get('id');
    this.productService.getProductDetails(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )

  }
}
