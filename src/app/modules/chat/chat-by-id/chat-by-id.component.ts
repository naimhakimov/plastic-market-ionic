import { Component, ViewChild } from '@angular/core'
import { OfferService } from '../../../services/offer.service'
import { ActivatedRoute } from '@angular/router'
import { first } from 'rxjs'
import { Message } from '../../../models/chat.interface'
import { IonContent } from '@ionic/angular'
import { UserInterface } from '../../../models/user.interface'

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
  currentUser: UserInterface = JSON.parse(localStorage.getItem('user') || '')
  loading = false
  offer_id: any


  constructor(
    public readonly offerService: OfferService,
    private readonly route: ActivatedRoute
  ) {
  }

  ionViewDidEnter() {
    this.loading = true
    this.chatId = this.route.snapshot.params['id']
    this.offer_id = this.route.snapshot.queryParams['offer_id']
    this.offerService.getMessages(this.chatId)
      .pipe(first())
      .subscribe(messages => {
        this.messages = messages
        this.content.scrollToBottom(5)
        this.loading = false
      }, () => this.loading = false)
  }

  sendMessage(): void {
    if (!this.message) {
      return
    }

    if (this.offer_id) {
      this.offerService.sendProp({ id: this.offer_id, comment: this.message })
        .subscribe(res => {
          this.send(res)
        })
    } else {
      this.offerService.sendMessage({ chat_id: this.chatId, message: this.message })
        .pipe(first())
        .subscribe((res) => {
          this.send(res)
        })
    }
  }

  private send(res: any) {
    if (res.error_code === 0) {
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
  }
}
