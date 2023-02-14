import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core'
import { OfferService } from '../../../services/offer.service'
import { Chat } from '../../../models/chat.interface'
import { Router } from '@angular/router'
import { first } from 'rxjs'

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  chats: Chat[] = []
  loading = false

  constructor(
    private readonly offerService: OfferService,
    private readonly router: Router,
  ) {
  }

  ionViewDidEnter() {
    this.loading = true
    this.offerService.getChats()
      .pipe(first())
      .subscribe(res => {
        this.chats = res
        this.loading = false
      }, () => {
        this.loading = false
      })
  }

  navigate(chat: Chat): void {
    this.offerService.currentChat$.next(chat.user)
    this.router.navigate(['/dashboard/chat/' + chat.id])
  }
}
