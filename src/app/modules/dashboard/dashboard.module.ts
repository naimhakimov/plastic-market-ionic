import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'

import { DashboardComponent } from './dashboard.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { FavouritePageComponent } from './pages/favourite-page/favourite-page.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { CardItemComponent } from './components/card-item/card-item.component'
import { ProductDetailsComponent } from './pages/product-details/product-details.component'
import { FilterComponent } from './components/filter/filter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SwiperModule } from 'swiper/angular'
import { ProductsComponent } from './pages/products/products.component'
import { CustomSelectModule, InputModule, SelectModule } from '../../shared'
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
        path: 'profile',
        component: ProfilePageComponent,
        canActivateChild: [AuthGuard]
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent,
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
