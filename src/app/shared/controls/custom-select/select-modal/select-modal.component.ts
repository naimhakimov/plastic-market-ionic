import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {
  @Input() items: any[] = []
  @Input() cloneItems: any[] = []
  @Input() defaultValue: any
  value = null

  constructor(
    private readonly modalController: ModalController
  ) {
  }

  ngOnInit() {
    this.items = this.cloneItems = this.items.map(item => ({ ...item, checked: item.id === this.defaultValue?.id }))
  }

  async cancel() {
    await this.modalController.dismiss(null)
  }

  filter(value: string): void {
    this.items = this.cloneItems.filter(item => item.name?.toLowerCase().includes(value.toLowerCase().trim()))
  }

  async select(item: any) {
    await this.modalController.dismiss(item)
  }
}
