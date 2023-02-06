import { Component } from '@angular/core'
import { OfferService } from '../../../../services/offer.service'
import { first } from 'rxjs'
import { Offer } from '../../../../models/offer.interface'
import { NavController } from '@ionic/angular'

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.scss']
})
export class FavouritePageComponent {

  favourites: Offer[] = []

  constructor(
    private readonly offerService: OfferService,
    private readonly navCtrl: NavController
  ) {}

  ionViewDidEnter(): void {
    this.offerService.getFavoriteOffers()
      .pipe(first())
      .subscribe(res => {
        this.favourites = res
      })
  }

  navigate(item: any) {
    this.offerService.offerId.next(item.id)
    this.navCtrl.navigateBack('/dashboard/product-details', {
      animationDirection: 'back'
    })
  }
}
