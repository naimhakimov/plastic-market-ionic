import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map, Observable } from 'rxjs'

import { iResponse } from '../models/auth.interface'
import { Offer } from '../models/product.interface'
import { UserInterface } from '../models/user.interface'
import { CategoryInterface } from '../models/category.interface'
import { CityInterface } from '../models/city.interface'

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private readonly _http: HttpClient) {
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

  getCategories(): Observable<CategoryInterface[]> {
    return this._http
      .get<iResponse<{ categories: CategoryInterface[] }>>('/get_categories')
      .pipe(map(res => res.data.categories))
  }

  getCountries(): Observable<CityInterface[]> {
    return this._http
      .get<iResponse<{ cities: CityInterface[] }>>('/get_cities')
      .pipe(map(res => res.data.cities))
  }

  getOwnOffers(): Observable<iResponse<{ offers: Offer[] }>> {
    return this._http.post<iResponse<{ offers: Offer[] }>>('/get_own_offers', {})
  }

  createOffer(offer: Offer): Observable<iResponse<Offer>> {
    return this._http.post<iResponse<Offer>>('/create_offer', offer)
  }

  uploadFile(formData: any) {
    return this._http.post(`/upload?token=${localStorage.getItem('token')}`, formData)
  }

  uploadFileByUrl(body: { image: string }): Observable<{ image: string }> {
    return this._http.post<{ image: string }>('/uploadimage', body)
  }
}
