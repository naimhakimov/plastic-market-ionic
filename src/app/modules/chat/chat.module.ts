import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { RouterModule, Routes } from '@angular/router'

import { ChatComponent } from './chat.component'
import { ChatByIdComponent } from './chat-by-id/chat-by-id.component'
import { ChatListComponent } from './chat-list/chat-list.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: 'list',
        component: ChatListComponent
      },
      {
        path: ':id',
        component: ChatByIdComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    ChatComponent,
    ChatByIdComponent,
    ChatListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ChatModule {
}
