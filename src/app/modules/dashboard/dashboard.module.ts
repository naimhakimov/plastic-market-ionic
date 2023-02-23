import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'

import { DashboardComponent } from './dashboard.component'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { FavouritePageComponent } from './pages/favourite-page/favourite-page.component'
import { CardItemComponent } from './components/card-item/card-item.component'
import { ProductDetailsComponent } from './pages/product-details/product-details.component'
import { FilterComponent } from './components/filter/filter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SwiperModule } from 'swiper/angular'
import { ProductsComponent } from './pages/products/products.component'
import { CustomSelectModule, InputModule, SelectModule } from '../../shared'
import { CreateComponent } from './components/create/create.component'
import { AuthGuard } from '../../guards/auth.guard'
import { TooltipModule } from '../../shared/components/tooltip/tooltip.module'

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
        path: 'product-details',
        component: ProductDetailsComponent
      },
      {
        path: 'chat',
        canActivate: [AuthGuard],
        loadChildren: () => import('../../modules/chat/chat.module').then(m => m.ChatModule)
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
    ProductDetailsComponent,
    FilterComponent,
    ProductsComponent,
    FavouritePageComponent
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
    CustomSelectModule,
    TooltipModule
  ]
})
export class DashboardModule {
}
