import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { iResponse } from '../models/auth.interface'
import { Offer } from '../models/product.interface'
import { UserInterface } from '../models/user.interface'

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private _http: HttpClient) {
  }

  offerId: BehaviorSubject<string> = new BehaviorSubject<string>('')

  getOffers(): Observable<iResponse<{ offers: Offer[] }>> {
    return this._http.post<iResponse<{ offers: Offer[] }>>('/get_offers', {})
  }

  addToFavourite(offerId: string): Observable<any> {
    return this._http.post('/add_favorite', { offer_id: offerId })
  }

  removeFromFavourite(offerId: string): Observable<any> {
    return this._http.post('/remove_favorite', { offer_id: offerId })
  }

  getOffer(offerId: string): Observable<iResponse<{ offer: Offer & { user: UserInterface } }>> {
    return this._http.post<iResponse<{ offer: Offer & { user: UserInterface } }>>('/get_offer', { id: offerId })
  }
}
