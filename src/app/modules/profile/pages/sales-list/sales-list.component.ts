import { Component, DoCheck, OnInit } from '@angular/core'
import { ActionSheetController, NavController } from '@ionic/angular'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

import { OfferService } from '../../../../services/offer.service'
import { Offer } from '../../../../models/offer.interface'
import { first } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit, DoCheck {

  active: number = 0
  public ownOffers: Offer[] = []
  loading = false
  cloneOffers: Offer[] = []

  constructor(
    private readonly offerService: OfferService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) {
  }

  ngOnInit() {
    this.getOwnOffers(null)
  }

  ngDoCheck(): void {
    if (this.active === 0) {
      this.ownOffers = this.cloneOffers
    } else {
      this.ownOffers = []
    }
  }

  getOwnOffers(event: any): void {
    this.loading = true
    this.offerService.getOwnOffers()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.ownOffers = res.data.offers
        this.cloneOffers = res.data.offers
        event?.target?.complete()
        this.loading = false
      }, error => this.loading = false)
  }

  navigate(id: string): void {
    this.offerService.offerId.next(id)
    this.navCtrl.navigateBack('/dashboard/product-details')
  }

  async removeOffer(event: any, id: string) {
    event.stopPropagation()
    event.preventDefault()
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Удалить',
          role: 'destructive',
          data: {
            action: 'delete'
          }
        }
      ]
    })

    await actionSheet.present()

    const result = await actionSheet.onDidDismiss()
    if (result.data?.action === 'delete') {
      this.offerService.deleteOfferById(id)
        .pipe(first())
        .subscribe(() => this.getOwnOffers(null))
    }
  }
}
