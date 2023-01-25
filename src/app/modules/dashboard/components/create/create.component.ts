import { Component, OnInit } from '@angular/core'
import { AlertController, ModalController } from '@ionic/angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OfferService } from '../../../../services/offer.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { forkJoin } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form!: FormGroup
  categories: any[] = []
  cities: any[] = []
  images: File[] = []
  loading = false

  constructor(
    private offerService: OfferService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm()

    forkJoin([
      this.offerService.getCategories(),
      this.offerService.getCountries()
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([categories, cities]) => {
        this.categories = categories.map(item => ({
          label: item.name,
          value: item,
          type: 'radio'
        }))

        this.cities = cities.map(item => ({
          label: item.name,
          value: item,
          type: 'radio'
        }))
      })
  }

  changeInputFile(event: any) {
    const file = event.target.files[0]
    let formData: any = new FormData()

    formData.append('file', file, file.name)
    formData.append("reportProgress", true)

    console.log(formData)

    this.offerService.uploadFile(formData)
      .subscribe(console.warn)
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: ['', [Validators.min(1), Validators.maxLength(8000)]],
      amount: [null, Validators.required],
      category_id: [null, Validators.required],
      city_id: [null, Validators.required]
    })
  }

  async cancel() {
    await this.modalCtrl.dismiss()
  }

  onSubmit(): void {
    this.loading = true

    this.offerService.createOffer({
      ...this.form.value,
      city_id: this.form.value.city_id.id,
      category_id: this.form.value.category_id.id
    }).subscribe(res => {
      this.loading = false
      if (res.error_code === 0) {
        this.cancel()
      }
    })
  }
}
