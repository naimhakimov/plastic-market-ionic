import { Component, OnInit } from '@angular/core'
import { OfferService } from '../../../../services/offer.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Offer } from '../../../../models/product.interface'

@UntilDestroy()
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  active: number = 0
  public ownOffers: Offer[] = []

  constructor(private readonly offerService: OfferService) {
  }

  ngOnInit() {
    this.getOwnOffers(null);
  }

  getOwnOffers(event: any): void {
    this.offerService.getOwnOffers()
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.ownOffers = res.data.offers
        event?.target?.complete();
      });
  }

}
