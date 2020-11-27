import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'src/app/common/product';
import {ProductService} from 'src/app/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";
import {log} from "util";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {


  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  previousKeyWord: string = null;
  currentCategoryName: string = "book";
  searchMode: boolean = false;

  thePagenumber: number = 0;
  thePageSize: number = 8;
  theTotalElements: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSerachProduct();
    } else {
      this.handleListProduct();
    }

  }

  handleListProduct() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    } else {
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePagenumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    this.productService
      .getProductListPaginate(this.thePagenumber - 1, this.thePageSize, this.currentCategoryId)
      .subscribe(this.processResult());

  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePagenumber = 1;
    this.listProducts();
  }

  addToCart(tempProduct: Product) {
    const cartItem: CartItem = new CartItem(tempProduct);
    this.cartService.addToCart(cartItem);

  }

  private handleSerachProduct() {
    const theKeyWord = this.route.snapshot.paramMap.get('keyword');
    if (this.previousKeyWord != theKeyWord) {
      this.thePagenumber = 1;
    }
    this.productService
      .searchProductPaginate(this.thePagenumber - 1, this.thePageSize, theKeyWord)
      .subscribe(this.processResult())

  }

  private processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePagenumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    };
  }
}
