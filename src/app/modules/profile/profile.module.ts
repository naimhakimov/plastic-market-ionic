import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { ProfileComponent } from './profile.component'
import { SalesListComponent } from './pages/sales-list/sales-list.component'
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component'
import { InputModule } from '../../shared'
import { ReactiveFormsModule } from '@angular/forms'
import { InputMaskModule } from '@ngneat/input-mask'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfilePageComponent
      },
      {
        path: 'sales-list',
        component: SalesListComponent
      },
      {
        path: 'edit',
        component: ProfileEditComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ProfileEditComponent,
    ProfileComponent,
    ProfilePageComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    InputModule,
    ReactiveFormsModule,
    InputMaskModule
  ]
})
export class ProfileModule {

}
