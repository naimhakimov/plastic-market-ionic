import { Component, OnInit } from '@angular/core'
import { OfferService } from '../../../services/offer.service'
import { Observable } from 'rxjs'
import { Chat } from '../../../models/chat.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  chats$!: Observable<any>

  constructor(
    private readonly offerService: OfferService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
    this.chats$ = this.offerService.getChats()
  }

  navigate(chat: Chat): void {
    this.offerService.currentChat$.next(chat.user)
    this.router.navigate(['/chat/' + chat.id])
  }
}
