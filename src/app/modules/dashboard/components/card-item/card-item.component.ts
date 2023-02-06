import { Component, Input, OnInit } from '@angular/core'
import { Offer } from '../../../../models/offer.interface'
import { OfferService } from '../../../../services/offer.service'
import { first } from 'rxjs'
import { FavouriteService } from '../../../../services/favourite.service'

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent {

  @Input() offer!: Offer

  constructor(
    public readonly favouriteService: FavouriteService
  ) {
  }
}
