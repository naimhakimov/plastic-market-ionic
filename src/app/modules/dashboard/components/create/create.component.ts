import { Component, Input, OnInit } from '@angular/core'
import { AlertController, ModalController } from '@ionic/angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OfferService } from '../../../../services/offer.service'
import { UntilDestroy } from '@ngneat/until-destroy'
import { first } from 'rxjs'
import { Offer } from '../../../../models/offer.interface'

@UntilDestroy()
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input() offer!: Offer

  form!: FormGroup
  categories: any[] = []
  cities: any[] = []
  subCategories: any[] = []
  cloneCategories: any[] = []
  cloneCities: any[] = []
  images: string[] = []
  loading = false
  offerManuals: any = {
    types: [],
    size_types: [],
    meterial_types: []
  }
  regions: any[] = []

  constructor(
    private offerService: OfferService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.initForm()
    this.getOfferManuals()
    this.categories = this.cloneCategories = JSON.parse(localStorage.getItem('categories') || '[]')
    this.categories = this.cloneCategories.filter(item => item.parent_id === '0')
    this.cities = this.cloneCities = JSON.parse(localStorage.getItem('cities') || '[]')
    this.regions = JSON.parse(localStorage.getItem('regions') || '[]')

    this.form.controls['category_id'].valueChanges
      .subscribe(category_id => {
        this.form.controls['subcategory_id'].setValue(null)
        this.subCategories = this.cloneCategories.filter(item => item.parent_id === category_id)
      })

    this.form.controls['region_id'].valueChanges
      .subscribe(region_id => {
        this.form.controls['city_id'].setValue(null)
        this.cities = this.cloneCities.filter(item => item.region_id === region_id)
      })

    if (this.offer) {
      const offer = JSON.parse(JSON.stringify(this.offer))
      if (offer.category) {
        offer.category_id = offer.category.parent_id
        offer.subcategory_id = offer.category.id
      } else {
        offer.category_id = null
        offer.subcategory_id = null
      }
      this.form.patchValue(offer)
      this.images = this.offer.image
    }
  }

  getOfferManuals() {
    this.offerService.getOfferManuals()
      .pipe(first())
      .subscribe(({ data }) => {
        this.offerManuals.types = data.types
        this.offerManuals.size_types = data.size_types
        this.offerManuals.meterial_types = data.meterial_types
      })
  }

  changeInputFile(event: any) {
    const file = event.target.files[0]
    let formData: any = new FormData()

    formData.append('file', file, file.name)
    formData.append('reportProgress', true)

    this.offerService.uploadFile(formData)
      .pipe(first())
      .subscribe((res: any) => {
        this.images.push(res?.image)
      })
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: ['', [Validators.min(1), Validators.maxLength(8000)]],
      amount: [null, Validators.required],
      category_id: [null, Validators.required],
      subcategory_id: [null],
      city_id: [null, Validators.required],
      delivery: ['', Validators.required],
      region_id: [null, Validators.required],
      type_id: [null, Validators.required],
      size_type_id: [null, Validators.required],
      size: [null, Validators.required],
      meterial_type_id: [null, Validators.required]
    })
  }

  async cancel(data = null) {
    await this.modalCtrl.dismiss(data)
  }

  onSubmit(): void {
    if (!this.images.length) {
      this.alertImage()
      return;
    }
    if (this.offer?.id) {
      this.offerService.updateOffer({
        id: this.offer.id,
        ...this.form.value,
        category_id: this.form.value.subcategory_id,
        image: this.images.length ? this.images : null
      }).subscribe(res => {
        this.loading = false
        if (+res.error_code === 0) {
          this.cancel(res.post_data)
        } else {
          this.alert()
        }
      })
    } else {
      this.offerService.createOffer({
        ...this.form.value,
        category_id: this.form.value.subcategory_id,
        image: this.images.length ? this.images : null
      }).subscribe(res => {
        this.loading = false
        if (+res.error_code === 0) {
          this.cancel()
        } else {
          this.alert()
        }
      })
    }

    this.offerService.filter$.next({})
  }

  async alert() {
    let alert = await this.alertController.create({
      header: 'Упс!!!',
      buttons: ['OK'],
      message: 'Произошло какой-то необрабатываемое ошибка'
    })

    await alert.present()
  }

  async alertImage() {
    let alert = await this.alertController.create({
      header: 'Ошибка!!!',
      buttons: ['OK'],
      message: 'Необходимо добавить минимум одно фото'
    })

    await alert.present()
  }
}
