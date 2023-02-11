import { Component, OnInit } from '@angular/core'
import { OfferService } from '../../../../services/offer.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Offer } from '../../../../models/offer.interface'
import { NavController } from '@ionic/angular'

@UntilDestroy()
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  active: number = 0
  public ownOffers: Offer[] = []
  loading = false

  constructor(
    private readonly offerService: OfferService,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    this.getOwnOffers(null)
  }

  getOwnOffers(event: any): void {
    this.loading = true
    this.offerService.getOwnOffers()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.ownOffers = res.data.offers
        event?.target?.complete()
        this.loading = false
      }, error => this.loading = false)
  }

  navigate(id: string): void {
    this.offerService.offerId.next(id)
    this.navCtrl.navigateBack('/dashboard/product-details')
  }
}
