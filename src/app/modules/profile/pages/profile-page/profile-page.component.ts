import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  currentUser = JSON.parse(localStorage.getItem('user') || '')
  constructor(private router: Router) {}

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

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/auth/welcome'])
  }

  errorAvatar(event: any): void {
    event.target['src'] = 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png'
  }
}
