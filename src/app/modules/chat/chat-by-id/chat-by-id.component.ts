import { Component, ViewChild } from '@angular/core'
import { OfferService } from '../../../services/offer.service'
import { ActivatedRoute } from '@angular/router'
import { first } from 'rxjs'
import { Message } from '../../../models/chat.interface'
import { IonContent } from '@ionic/angular'

@Component({
  selector: 'app-chat-by-id',
  templateUrl: './chat-by-id.component.html',
  styleUrls: ['./chat-by-id.component.scss']
})
export class ChatByIdComponent {
  messages: Message[] = []
  message: string = ''
  chatId!: string

  @ViewChild(IonContent) content!: IonContent;


  constructor(
    public readonly offerService: OfferService,
    private readonly route: ActivatedRoute
  ) {
  }

  ionViewDidEnter() {
    this.chatId = this.route.snapshot.params['id']
    this.offerService.getMessages(this.chatId)
      .pipe(first())
      .subscribe(messages => {
        this.messages = messages
        console.log(this.content)
        this.content.scrollToBottom(500)
      })
  }

  sendMessage(): void {
    if (!this.message) {
      return
    }

    this.offerService.sendMessage({ chat_id: this.chatId, message: this.message })
      .pipe(first())
      .subscribe((res) => {
        if (res.error_code === 0) {
          const created_at = new Date()
          created_at.setHours(created_at.getHours() - 2)
          const message: Message = {
            created_at: created_at.toISOString(),
            message: this.message
          }
          this.messages.push(message)
          this.message = ''
          this.content.scrollToBottom(500)
        }
      })

  }
}
