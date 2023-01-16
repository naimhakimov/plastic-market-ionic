import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-chat-by-id',
  templateUrl: './chat-by-id.component.html',
  styleUrls: ['./chat-by-id.component.scss']
})
export class ChatByIdComponent implements OnInit {
  public messages: string[] = ['Привет', 'Привет', 'Как дела у тебя?', 'Хорошо🤟', 'Я слышал, вы, ребята, запускаете новый продукт?', 'Да, это новый товар такой)', 'Спасибо, прекрасно']
  message: string = ''

  constructor() {
  }

  ngOnInit() {
  }

  sendMessage(): void {
    this.messages.push(this.message)
    this.message = ''
  }
}
