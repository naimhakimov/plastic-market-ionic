import { Component, OnInit } from '@angular/core'
import SwiperCore, { Autoplay, Keyboard, Pagination, Zoom } from 'swiper'
import { ProductsComponent } from '../products/products.component'
import { OfferService } from '../../../../services/offer.service'
import { first, of, switchMap } from 'rxjs'
import { Offer } from '../../../../models/offer.interface'
import { UserInterface } from '../../../../models/user.interface'
import { Router } from '@angular/router'
import { NavController } from '@ionic/angular'

SwiperCore.use([Autoplay, Keyboard, Pagination, Zoom])

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  offerByIdData!: Offer & { user: UserInterface }
  active = 0

  constructor(
    private offerService: OfferService,
    private navCtrl: NavController

  ) {
  }

  ngOnInit() {
    this.offerService.offerId.pipe(
      switchMap(id => {
        if (id) {
          return this.offerService.getOffer(id)
        }

        return of(null)
      })
    ).subscribe(res => {
      if (res?.data.offer) {
        this.offerByIdData = res.data.offer
      } else {
        this.navCtrl.navigateBack('/dashboard/home')
      }
    })
  }

}
