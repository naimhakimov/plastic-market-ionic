import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CreateComponent } from './components/create/create.component'
import { NavigationEnd, Router } from '@angular/router'
import { OfferService } from '../../services/offer.service'
import { first, forkJoin } from 'rxjs'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: any[] = []
  active: any
  isChat = false

  constructor(
    public readonly offerService: OfferService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth/welcome'])
    }

    forkJoin([
      this.offerService.getCategories(),
      this.offerService.getFavoriteOffers(),
      this.offerService.getCountries(),
      this.offerService.getRegions()
    ]).pipe(first())
      .subscribe(([categories, favorites, cities, regions]) => {
        this.categories = categories.filter(item => item.parent_id === '0').map(item => ({
          ...item,
          subcategories: [{
            ...item,
            name: 'Все'
          }, ...categories.filter(i => item.id === i.parent_id)]
        }))
        localStorage.setItem('favourites', JSON.stringify(favorites.map(item => item.id) || '[]'))
        localStorage.setItem('categories', JSON.stringify(categories) || '[]')
        localStorage.setItem('cities', JSON.stringify(cities) || '[]')
        localStorage.setItem('regions', JSON.stringify(regions) || '[]')
      })

    this.router.events.subscribe(res => {
      if (res  instanceof NavigationEnd) {
        this.isChat = res.url.includes('/dashboard/chat/')
      }
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

  selectCategory(id: string) {
    if (this.active === id) {
      this.active = null
    } else {
      this.active = id
    }
  }

  next(id: string, first: boolean): void {
    this.router.navigate(['/dashboard']).finally(() => {
      this.offerService.category.next({ id, isParent: first })
    })
  }
}
