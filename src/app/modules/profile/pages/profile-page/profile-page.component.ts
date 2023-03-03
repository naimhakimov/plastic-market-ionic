import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserInterface } from '../../../../models/user.interface'
import { NavController } from '@ionic/angular'
import { OfferService } from '../../../../services/offer.service'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  currentUser!: UserInterface

  constructor(
    public offerService: OfferService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  items: { icon: string, title: string, link: string | null }[] = [
    {
      icon: 'user',
      title: 'Редактировать профиль',
      link: '/profile/edit'
    },
    {
      icon: 'sales-list',
      title: 'Список продаж',
      link: '/profile/sales-list'
    },
    {
      icon: 'logout',
      title: 'Выйти',
      link: null
    }
  ]

  ionViewDidEnter(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '')
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/auth/welcome'])
  }

  errorAvatar(event: any): void {
    event.target['src'] = 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png'
  }

  back(): void {
    this.navCtrl.back()
  }
}
