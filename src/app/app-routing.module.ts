import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
  // {
  //   path: '*',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
