import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'

import { DashboardComponent } from './dashboard.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { FavouritePageComponent } from './pages/favourite-page/favourite-page.component'
import { MessageComponent } from './pages/message/message.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { CardItemComponent } from './components/card-item/card-item.component'
import { ProductDetailsComponent } from './pages/product-details/product-details.component'
import { FilterComponent } from './components/filter/filter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SwiperModule } from 'swiper/angular'
import { ProductsComponent } from './pages/products/products.component'
import { SelectModule } from '../../shared/controls/select/select.module'
import { CustomSelectModule, InputModule } from '../../shared'
import { CreateComponent } from './components/create/create.component'
import { AuthGuard } from '../../guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomePageComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'favourite',
        component: FavouritePageComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'message',
        component: MessageComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfilePageComponent,
        canActivateChild: [AuthGuard]
      }
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    CardItemComponent,
    CreateComponent,
    MessageComponent,
    ProfilePageComponent,
    ProductDetailsComponent,
    FilterComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    RouterModule.forChild(routes),
    SelectModule,
    InputModule,
    CustomSelectModule
  ]
})
export class DashboardModule {
}
