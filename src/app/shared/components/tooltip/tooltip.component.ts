import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FilterComponent } from '../../../modules/dashboard/components/filter/filter.component'
import { ModalController } from '@ionic/angular'
import { OfferService } from '../../../services/offer.service'

import {isPlatform} from '@ionic/angular'

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input() showSearch = true
  @Output() changeSearch = new EventEmitter()

  constructor(
    private modalCtrl: ModalController,
    public offerService: OfferService
  ) { }

  ngOnInit() {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent
    })
    modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      this.offerService.filter$.next(data)
    }
  }

  change(event: any) {
    this.changeSearch.emit(event.target["value"])
  }
}
