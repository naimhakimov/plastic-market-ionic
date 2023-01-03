import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Zoom } from 'swiper';
import { ProductsComponent } from '../products/products.component'
import { OfferService } from '../../../../services/offer.service'
import { first, switchMap } from 'rxjs'
import { Offer } from '../../../../models/product.interface'
import { UserInterface } from '../../../../models/user.interface'

SwiperCore.use([Autoplay, Keyboard, Pagination, Zoom]);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  component = ProductsComponent
  offerByIdData!: Offer & { user: UserInterface }
  active = 0

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.offerService.offerId.pipe(
      first(),
      switchMap(id => this.offerService.getOffer(id))
    ).subscribe(res => this.offerByIdData = res.data.offer)
  }

}
