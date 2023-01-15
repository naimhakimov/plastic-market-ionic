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

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: ['', [Validators.required, Validators.min(1), Validators.maxLength(8000)]],
      amount: [null, Validators.required],
      category_id: [null, Validators.required],
      city_id: [null, Validators.required]
    })
  }

  async openSelect() {
    const alert = await this.alertController.create({
      buttons: ['OK'],
      inputs: this.categories
    })

    await alert.present()

    const { data } = await alert.onWillDismiss()

    console.log(data)
  }
}
