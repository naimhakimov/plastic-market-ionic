import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, map, Observable } from 'rxjs'

import { iResponse } from '../models/auth.interface'
import { Offer, OfferManual } from '../models/offer.interface'
import { UserInterface } from '../models/user.interface'
import { CategoryInterface } from '../models/category.interface'
import { CityInterface } from '../models/city.interface'
import { HttpService } from './http.service'
import { Chat, Data, Message } from '../models/chat.interface'

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  constructor(private readonly _http: HttpClient) {}

  offerId: BehaviorSubject<string> = new BehaviorSubject<string>('')
  currentChat$: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null)
  isCreated = false

  getOffers(body?: any): Observable<iResponse<{ offers: Offer[] }>> {
    return this._http.post<any>('/get_offers', body)
  }

  addToFavourite(offerId: string): Observable<any> {
    return this._http.post('/add_favorite', { offer_id: offerId })
  }

  removeFromFavourite(offerId: string): Observable<any> {
    return this._http.post('/remove_favorite', { offer_id: offerId })
  }

  getOffer(offerId: string): Observable<iResponse<{ offer: Offer & { user: UserInterface } }>> {
    return this._http.post<any>('/get_offer', { id: offerId })
  }

  getCategories(): Observable<CategoryInterface[]> {
    return this._http
      .get<any>('/get_categories')
      .pipe(map(res => res.data.categories))
  }

  getCountries(): Observable<CityInterface[]> {
    return this._http
      .get<any>('/get_cities')
      .pipe(map(res => res.data.cities))
  }

  getOwnOffers(): Observable<iResponse<{ offers: Offer[] }>> {
    return this._http.post<any>('/get_own_offers', {})
  }

  createOffer(offer: Offer): Observable<iResponse<Offer>> {
    return this._http.post<any>('/create_offer', offer)
  }

  uploadFile(formData: any) {
    return this._http.post(`/upload?token=${localStorage.getItem('token')}`, formData)
  }

  uploadFileByUrl(body: { image: string }): Observable<{ image: string }> {
    return this._http.post<any>('/uploadimage', body)
  }

  getOfferManuals(): Observable<iResponse<OfferManual>> {
    return this._http.get<any>('/get_offer_manuals')
  }

  getFavoriteOffers(): Observable<Offer[]> {
    return this._http.post<iResponse<{ offers: Offer[] }>>('/get_favorite_offers', {})
      .pipe(map(res => res.data.offers))
  }

  getChats(): Observable<Chat[]> {
    return this._http.post<iResponse<Data>>('/get_chats', {}).pipe(map(res => res.data.chats))
  }

  getMessages(chat_id: string): Observable<Message[]> {
    return this._http.post<iResponse<{ messages: Message[] }>>('/get_messages', { chat_id })
      .pipe(map(res => res.data.messages.sort((a, b) => {
        // @ts-ignore
        return new Date(a.created_at) - new Date(b.created_at)
      })))
  }

  sendProp(): Observable<any> {
    return this._http.post('/send_prop', {})
  }

  sendMessage(body: { chat_id: string, message: string }): Observable<iResponse<any>> {
    return this._http.post<iResponse<any>>('/send_message', body)
  }
}
