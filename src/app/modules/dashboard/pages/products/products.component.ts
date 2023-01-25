import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular'
import { FilterComponent } from '../../components/filter/filter.component'
import { OfferService } from '../../../../services/offer.service'
import { Offer } from '../../../../models/offer.interface'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { BehaviorSubject, switchMap } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  offers!: Offer[]
  filter$ = new BehaviorSubject(null)

  constructor(
    private modalCtrl: ModalController,
    public offerService: OfferService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.getOffers(null);
  }

  getOffers(event: any): void {
    this.filter$
      .pipe(
        switchMap((filter) => {
          return this.offerService.getOffers(filter)
        }),
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.offers = res.data?.offers || [];
        event?.target?.complete();
      })
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.filter$.next(data)
    }
  }

  refresh(event: any) {
    this.filter$.next(null)
    event?.target?.complete();
  }

  navigate(item: any) {
    this.navCtrl.navigateBack('/dashboard/product-details')
    this.offerService.offerId.next(item.id)
  }
}
