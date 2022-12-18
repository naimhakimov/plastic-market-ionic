import { Component, OnInit } from '@angular/core'
import { NavigationInterface } from '../../types/navigation.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public navigation: NavigationInterface[] = [
    { name: 'Главная', icon: 'icon-home', link: '' },
    { name: 'Избранное', icon: 'icon-favourite', link: '' },
    { name: 'Создать', icon: 'icon-create', link: '' },
    { name: 'Сообщения', icon: 'icon-message-icon', link: '' },
    { name: 'Профиль', icon: 'icon-user', link: '' },
  ]

  constructor() {}

  ngOnInit() {}
}
