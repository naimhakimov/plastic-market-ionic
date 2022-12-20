import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { FilterComponent } from '../../components/filter/filter.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

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
