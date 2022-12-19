import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'

import { DashboardComponent } from './dashboard.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { FavouritePageComponent } from './pages/favourite-page/favourite-page.component'
import { CreateComponent } from './pages/create/create.component'
import { MessageComponent } from './pages/message/message.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'favourite',
        component: FavouritePageComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'message',
        component: MessageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      }
    ],
  },
]

@NgModule({
  declarations: [DashboardComponent, HomePageComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
