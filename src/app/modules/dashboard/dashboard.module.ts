import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'

import { DashboardComponent } from './dashboard.component'
import { HomePageComponent } from './pages/home-page/home-page.component'

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [],
  },
]

@NgModule({
  declarations: [DashboardComponent, HomePageComponent],
  imports: [CommonModule, IonicModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
