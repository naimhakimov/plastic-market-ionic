import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { OfferService } from '../../../../services/offer.service'
import { delay, first, forkJoin } from 'rxjs'
import { OfferManual } from '../../../../models/offer.interface'
import { FormBuilder, FormGroup } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { DEBUG } from '@angular/compiler-cli/src/ngtsc/logging/src/console_logger'

@UntilDestroy()
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
  cities: any[] = []
  categories: any[] = []

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly offerService: OfferService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  ngOnInit(): void {
    this.initForm()
    this.getOfferManuals()

    forkJoin([
      this.offerService.getCategories(),
      this.offerService.getCountries()
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([categories, cities]) => {
        this.categories = categories;
        this.cities = cities;
      })
  }

  async getOfferManuals() {
    this.offerService.getOfferManuals()
      .pipe(delay(3000), first())
      .subscribe(res => {
        this.offerManuals = res.data
      })
  }

  private initForm(): void {
    this.form = this.fb.group({
      category_id: [null],
      sort_type_id: [null],
      type_id: [null],
      city_id: [null],
      size_type_id: [null],
      meterial_type_id: [null],
      amount_max: [null],
      amount_min: [null],
    })
  }

  async onSubmit() {
    await this.modalCtrl.dismiss(this.form.value, 'confirm');
  }

  clearFilter(): void {
    this.form.reset();
  }
}
