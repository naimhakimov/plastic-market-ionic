import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import SwiperCore, { Autoplay, Keyboard, Pagination, Zoom } from 'swiper'
import { OfferService } from '../../../../services/offer.service'
import { of, switchMap } from 'rxjs'
import { Offer } from '../../../../models/offer.interface'
import { UserInterface } from '../../../../models/user.interface'
import { NavController } from '@ionic/angular'
import { FavouriteService } from '../../../../services/favourite.service'

SwiperCore.use([Autoplay, Keyboard, Pagination, Zoom])

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {
  offerByIdData!: Offer & { user: UserInterface }
  active = 0
  currentUser = JSON.parse(localStorage.getItem('user') || '')

  constructor(
    private offerService: OfferService,
    private navCtrl: NavController,
    public readonly favouriteService: FavouriteService,
    private cd: ChangeDetectorRef
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
        this.cd.detectChanges()
      } else {
        this.navCtrl.navigateBack('/dashboard/home')
      }
    })
  }

  generateRatingArray(rating: number): string[] {
    const ratings = ['icon-star', 'icon-star', 'icon-star', 'icon-star', 'icon-star']
    ratings.length = 5 - rating
    for (let i = 0; i < rating; i++) {
      ratings
        .unshift('icon-star-full')
    }

    return ratings
  }

  goToChat(offerByIdData: Offer & { user: UserInterface }): void {
    this.offerService.currentChat$.next(offerByIdData.user)
    this.offerService.getChats()
      .subscribe(chats => {
        const find = chats.find(item => item.offer_id === offerByIdData.id)
        if (find) {
          this.navCtrl.navigateForward('/chat/' + find.id)
        } else {
          this.navCtrl.navigateForward('/chat/new', { queryParams: { offer_id: offerByIdData.id } })
        }
      })
  }
}
