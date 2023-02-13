import { Component, Input, Output, EventEmitter } from '@angular/core'
import { Offer } from '../../../../models/offer.interface'
import { FavouriteService } from '../../../../services/favourite.service'

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  @Input() offer!: Offer
  @Output() removeOffer = new EventEmitter<string>()

  constructor(
    public readonly favouriteService: FavouriteService
  ) {
  }

  addOrRemove(event: any, offer: Offer) {
    this.favouriteService.addFavourite(event, offer.id)
    this.removeOffer.emit(offer.id)
  }
}
