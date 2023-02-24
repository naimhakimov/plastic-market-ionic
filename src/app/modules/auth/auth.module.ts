import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { IonicModule } from '@ionic/angular'
import { InputModule } from '../../shared'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { HttpClientModule } from '@angular/common/http'
import { AuthComponent } from './auth.component'
import { InputMaskModule } from '@ngneat/input-mask'

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        component: WelcomePageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    AuthComponent,
    WelcomePageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InputModule,
    InputMaskModule.forRoot({inputSelector: 'app-input'})
  ],
  providers: [AuthService]
})
export class AuthModule {
}
