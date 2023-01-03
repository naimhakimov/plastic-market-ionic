import { Component, Input, OnInit } from '@angular/core'
import { Offer } from '../../../../models/product.interface'
import { OfferService } from '../../../../services/offer.service'
import { first } from 'rxjs'

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() offer!: Offer

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
  }

  addOrFavourite(event: any, offerId: string): void {
    event.preventDefault()
    event.stopPropagation()
    let favourites: string[] = JSON.parse(localStorage.getItem('favourites') ?? '[]')
    if (favourites.includes(offerId)) {
      this.offerService.removeFromFavourite(offerId).pipe(first()).subscribe(() => {
        favourites = favourites.filter(id => id !== offerId)
        localStorage.setItem('favourites', JSON.stringify(favourites))
      })
    } else {
      this.offerService.addToFavourite(offerId).pipe(first()).subscribe(() => {
        favourites.push(offerId)
        localStorage.setItem('favourites', JSON.stringify(favourites))
      })
    }
  }

  isFavourite(offerId: string): boolean {
    return JSON.parse(localStorage.getItem('favourites') || '[]').includes(offerId)
  }
}
