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
export class SalesListComponent implements OnInit {

  active: number = 0
  public ownOffers: Offer[] = []
  loading = false
  cloneOffers: Offer[] = []

  constructor(
    public readonly offerService: OfferService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) {
  }

  ngOnInit() {
    this.getOwnOffers(null)
  }

  getOwnOffers(event: any, disabled?: string): void {
    this.loading = true
    this.offerService.getOwnOffers(disabled)
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

  navigateToBack(): void{
    this.navCtrl.back()
  }

  toggle(idx: number) {
    this.active = idx
    if (idx === 1) {
      this.getOwnOffers(null, '1')
    } else {
      this.getOwnOffers(null)
    }

  }
}
