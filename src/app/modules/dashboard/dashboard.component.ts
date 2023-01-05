import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CreateComponent } from './components/create/create.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  async createModal() {
   const modal = await  this.modalCtrl.create({
      component: CreateComponent
    })
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }
}
