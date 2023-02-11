import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CreateComponent } from './components/create/create.component'
import { Router } from '@angular/router'
import { OfferService } from '../../services/offer.service'
import { Category } from '../../models/offer.interface'
import { first, forkJoin } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: Category[] = []

  constructor(
    private readonly offerService: OfferService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/welcome'])
    }

    forkJoin([
      this.offerService.getCategories(),
      this.offerService.getFavoriteOffers()
    ]).pipe(first())
      .subscribe(([categories, favorites]) => {
        this.categories = categories
        localStorage.setItem('favourites', JSON.stringify(favorites.map(item => item.id) || '[]'))
      })
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
    localStorage.clear()
    this.router.navigate(['/auth/welcome'])
  }
}
