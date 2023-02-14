import { Component, OnInit } from '@angular/core'
import { ModalController, NavController } from '@ionic/angular'
import { FilterComponent } from '../../components/filter/filter.component'
import { OfferService } from '../../../../services/offer.service'
import { Offer } from '../../../../models/offer.interface'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { filter, switchMap } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  offers: Offer[] = []
  cloneOffers: Offer[] = []
  loading = false

  constructor(
    private modalCtrl: ModalController,
    public offerService: OfferService,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.getOffers(null)
    this.offerService.category
      .pipe(filter(category => !!category.id))
      .subscribe(({ id, isParent }) => {
        this.offers = this.cloneOffers.filter(item => {
          if (item.category) {
            const productId = item.category[isParent ? 'parent_id' : 'id']
            return productId === id
          }
          return
        })
      })
  }

  getOffers(event: any): void {
    this.loading = true
    this.offerService.filter$
      .pipe(
        switchMap((filter) => {
          return this.offerService.getOffers(filter)
        }),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.offers = this.cloneOffers = res.data?.offers || []
        event?.target?.complete()
        this.loading = false
      }, error => this.loading = false)
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent
    })
    modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      this.offerService.filter$.next(data)
    }
  }

  refresh(event: any) {
    this.offerService.filter$.next(null)
    event?.target?.complete()
  }

  navigate(item: any) {
    this.offerService.offerId.next(item.id)
    this.navCtrl.navigateBack('/dashboard/product-details', {
      animationDirection: 'back'
    })
  }

  changeSearch(event: any) {
    if (event) {
      this.offers = this.cloneOffers.filter(item => item.name.toLowerCase().includes(event.toLowerCase()))
    } else {
      this.offers = this.cloneOffers
    }
  }
}
