import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Zoom } from 'swiper';
import { ProductsComponent } from '../products/products.component'

SwiperCore.use([Autoplay, Keyboard, Pagination, Zoom]);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  component = ProductsComponent

  constructor() { }

  ngOnInit() {}

}
