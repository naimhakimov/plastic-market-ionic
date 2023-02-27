import { Component, ViewChild } from '@angular/core'
import { OfferService } from '../../../services/offer.service'
import { ActivatedRoute } from '@angular/router'
import { first, of, switchMap, timer } from 'rxjs'
import { Message } from '../../../models/chat.interface'
import { IonContent } from '@ionic/angular'
import { UserInterface } from '../../../models/user.interface'
import { stop } from 'ionicons/icons'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

@UntilDestroy()
@Component({
  selector: 'app-chat-by-id',
  templateUrl: './chat-by-id.component.html',
  styleUrls: ['./chat-by-id.component.scss']
})
export class ChatByIdComponent {
  @ViewChild(IonContent) content!: IonContent

  messages: Message[] = []
  message: string = ''
  chatId!: string
  currentUser: UserInterface = JSON.parse(localStorage.getItem('user') || 'null')
  loading = false
  offer_id: any
  chats = []


  constructor(
    public readonly offerService: OfferService,
    private readonly route: ActivatedRoute
  ) {
    this.chats = this.offerService.chatList$.getValue()
  }

  ionViewDidEnter() {
    this.loading = true
    this.chatId = this.route.snapshot.params['id']
    console.log(this.route.snapshot.params['id'])
    this.offer_id = this.route.snapshot.queryParams['offer_id']
    timer(0, 2000)
      .pipe(switchMap(() => {
        return (this.offerService.getMessages(this.chatId))
      }), untilDestroyed(this))
      .subscribe(messages => {
        this.messages = messages
        if (this.messages.length) {
          this.offer_id = ''
        }
        this.content.scrollToBottom(5)
        this.loading = false
      }, () => this.loading = false)
  }

  sendMessage(): void {
    if (!this.message) {
      return
    }

    if (this.chatId === 'new') {
      this.offerService.sendProp({ id: this.offer_id, comment: this.message })
        .pipe(first())
        .subscribe(res => {
          this.chatId = res.data.chat_id;
        })
    } else {
      this.offerService.sendMessage({ chat_id: this.chatId, message: this.message, user_id: this.currentUser.id })
        .pipe(first())
        .subscribe()
    }
    this.send()
  }

  private send() {
    const created_at = new Date()
    created_at.setHours(created_at.getHours() - 2)
    const message: Message = {
      created_at: created_at.toISOString(),
      direction: 'to',
      message: this.message,
      author_id: this.currentUser.id
    }
    this.messages.push(message)
    this.message = ''
    this.content.scrollToBottom(500)
  }

  errorAvatar(event: any): void {
    event.target.src = './assets/img/no-avatar.webp'
  }
}
