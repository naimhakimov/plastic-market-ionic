import { Component, OnInit } from '@angular/core'
import { AlertController, ModalController } from '@ionic/angular'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OfferService } from '../../../../services/offer.service'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { first, forkJoin } from 'rxjs'

@UntilDestroy()
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form!: FormGroup
  categories: any[] = []
  regions: any[] = []
  subCategories: any[] = []
  cloneCategories: any[] = []
  images: string[] = []
  loading = false
  offerManuals: any = {
    types: [],
    size_types: [],
    meterial_types: []
  }

  constructor(
    private offerService: OfferService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForm()
    this.getOfferManuals()
    this.categories = this.cloneCategories = JSON.parse(localStorage.getItem('categories') || '[]')
    this.categories = this.cloneCategories.filter(item => item.parent_id === '0')
    this.regions = JSON.parse(localStorage.getItem('regions') || '[]')

    this.form.controls['category_id'].valueChanges
      .subscribe(category_id => {
        this.form.controls['subcategory_id'].setValue(null)
        this.subCategories = this.cloneCategories.filter(item => item.parent_id === category_id)
      })
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
      type_id: [null, Validators.required],
      size_type_id: [null, Validators.required],
      size: [null, Validators.required],
      meterial_type_id: [null, Validators.required]
    })
  }

  async cancel() {
    await this.modalCtrl.dismiss()
  }

  onSubmit(): void {
    this.offerService.createOffer({
      ...this.form.value,
      image: this.images,
      category_id: this.form.value.subcategory_id ? this.form.value.subcategory_id : this.form.value.category_id
    }).subscribe(res => {
      this.loading = false
      if (res.error_code === 0) {
        this.cancel()
      }
    })
  }
}
