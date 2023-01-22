import { Component, OnInit } from '@angular/core'
import { LoadingController, ModalController } from '@ionic/angular'
import { OfferService } from '../../../../services/offer.service'
import { delay, first } from 'rxjs'
import { OfferManual } from '../../../../models/offer.interface'
import { addWarning } from '@angular-devkit/build-angular/src/utils/webpack-diagnostics'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  name!: string
  public offerManuals: OfferManual = {
    types: [],
    size_types: [],
    meterial_types: [],
    sort_types: []
  }

  form!: FormGroup

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly offerService: OfferService,
    private fb: FormBuilder
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm')
  }

  ngOnInit(): void {
    this.initForm()
    this.getOfferManuals()
  }

  async getOfferManuals() {
    this.offerService.getOfferManuals()
      .pipe(delay(3000), first())
      .subscribe(res => {
        this.offerManuals = res.data
      })
  }

  change(event: any) {
    console.log(event)
  }

  private initForm(): void {
    this.form = this.fb.group({
      type_id: [null],
      size_type_id: [null],
      meterial_type_id: [null],
    })
  }
}
