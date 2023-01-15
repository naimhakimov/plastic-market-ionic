import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { FilterComponent } from '../../components/filter/filter.component'
import { ProductDetailsComponent } from '../product-details/product-details.component'
import { OfferService } from '../../../../services/offer.service'
import { Offer } from '../../../../models/product.interface'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

@UntilDestroy()
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  component = ProductDetailsComponent;
  offers: Offer[] = []

  constructor(
    private modalCtrl: ModalController,
    public offerService: OfferService
  ) {}

  ngOnInit() {
    this.offerService.getOffers()
      .pipe(untilDestroyed(this))
      .subscribe(res => this.offers = res.data.offers)
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

}
