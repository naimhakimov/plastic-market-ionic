import { Component } from '@angular/core'
import { OfferService } from '../../../../services/offer.service'
import { first } from 'rxjs'
import { Offer } from '../../../../models/offer.interface'

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.scss']
})
export class FavouritePageComponent {

  favourites: Offer[] = []

  constructor(
    private readonly offerService: OfferService
  ) {}

  ionViewDidEnter(): void {
    this.offerService.getFavoriteOffers()
      .pipe(first())
      .subscribe(res => {
        this.favourites = res
      })
  }

}
