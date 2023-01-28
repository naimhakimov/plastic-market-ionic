import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CreateComponent } from './components/create/create.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accordions: string[] = ['Полимерные отходы', 'Полуфабрикаты (полимер)','Готовая продукция', 'Макулатура', 'Оборудование', 'Услуги', 'Рынок труда']

  constructor(private modalCtrl: ModalController, private router: Router) {
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/welcome'])
    }
  }

  async createModal() {
    const modal = await this.modalCtrl.create({
      component: CreateComponent
    })
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/welcome'])
  }
}
