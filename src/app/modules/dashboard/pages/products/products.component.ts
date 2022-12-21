import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { FilterComponent } from '../../components/filter/filter.component'
import { ProductDetailsComponent } from '../product-details/product-details.component'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  component = ProductDetailsComponent;


  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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
