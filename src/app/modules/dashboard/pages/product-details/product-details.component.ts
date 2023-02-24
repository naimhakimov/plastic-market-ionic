import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import SwiperCore, { Autoplay, Keyboard, Pagination, Zoom } from 'swiper'
import { OfferService } from '../../../../services/offer.service'
import { first, of, switchMap } from 'rxjs'
import { Offer } from '../../../../models/offer.interface'
import { UserInterface } from '../../../../models/user.interface'
import { ModalController, NavController } from '@ionic/angular'
import { FavouriteService } from '../../../../services/favourite.service'
import { CreateComponent } from '../../components/create/create.component'

SwiperCore.use([Autoplay, Keyboard, Pagination, Zoom])

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  offerByIdData!: Offer & { user: UserInterface }
  active = 0
  currentUser = JSON.parse(localStorage.getItem('user') || '')
  isFavorite = false;
  constructor(
    private offerService: OfferService,
    private navCtrl: NavController,
    public readonly favouriteService: FavouriteService,
    private modalCtrl: ModalController,
    private cdf: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.cdf.detectChanges();
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
        this.isFavorite = this.favouriteService.isFavourite(res.data.offer.id);
        this.cdf.detectChanges()
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
        const find = chats.find(item => item.user_1 === offerByIdData.user.id || item.user_1 === offerByIdData.user.id)
        if (find) {
          this.navCtrl.navigateForward('/dashboard/chat/' + find.id)
        } else {
          this.navCtrl.navigateForward('/dashboard/chat/new', { queryParams: { offer_id: offerByIdData.id } })
        }
      })
  }

  async editOffer(offer: Offer) {
    const modal = await this.modalCtrl.create({
      component: CreateComponent,
      componentProps: {
        offer
      }
    })

    await modal.present()

    const { data } = await modal.onWillDismiss()
    this.offerByIdData = { ...this.offerByIdData, ...data }
    this.cdf.detectChanges()
  }

  addFavourite(event: any) {
    this.favouriteService.addFavourite(event, this.offerByIdData.id)
    this.offerByIdData.favorite = this.offerByIdData.favorite ? 0 : 1;
    this.cdf.detectChanges()
  }

  deleteOffer(id: string): void {
    this.offerService.deleteOfferById(id)
      .pipe(first())
      .subscribe(() => {
        this.navCtrl.navigateForward('/dashboard')
        this.offerService.filter$.next({})
      })
  }
}
