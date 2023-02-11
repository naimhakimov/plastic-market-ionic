import { Injectable } from '@angular/core'
import { first } from 'rxjs'
import { OfferService } from './offer.service'

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private readonly offerService: OfferService) {}

  addFavourite(event: any, offerId: string): void {
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
