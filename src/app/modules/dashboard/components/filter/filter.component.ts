import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { OfferService } from '../../../../services/offer.service'
import { first } from 'rxjs'
import { OfferManual } from '../../../../models/offer.interface'
import { FormBuilder, FormGroup } from '@angular/forms'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { CityInterface } from '../../../../models/city.interface'

@UntilDestroy()
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
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
  cities: CityInterface[] = []
  cloneCities: CityInterface[] = []
  categories: any[] = []
  cloneCategories: any[] = []
  subCategories: any[] = []
  regions: any[] = []
  cloneRegions: any[] = []

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly offerService: OfferService,
    private fb: FormBuilder,
  ) {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  ngOnInit(): void {
    this.initForm()
    this.getOfferManuals()
    this.cities = this.cloneCities = JSON.parse(localStorage.getItem('cities') || '')
    this.categories = this.cloneCategories = JSON.parse(localStorage.getItem('categories') || '')
    this.regions = this.cloneRegions = JSON.parse(localStorage.getItem('regions') || '')
    this.categories = this.cloneCategories.filter(item => item.parent_id === '0')

    this.form.controls['region_id'].valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(region_id => {
        this.form.controls['city_id'].setValue(null)
        this.cities = this.cloneCities.filter(item => item.region_id === region_id)
      })

    const filter = this.offerService.filter$.getValue()
    const category = this.offerService.category.getValue()
    if (filter) {
      this.form.patchValue(filter)
      this.form.controls['category_id'].setValue(filter.category_id)
    }
    if (category.isParent) {
      this.form.controls['category_id'].setValue(category.id)
    } else {
      const item = this.cloneCategories.find(item => item.id === category.id)
      if (item?.parent_id) {
        this.form.controls['category_id'].setValue(item.parent_id)
        this.form.controls['subcategory_id'].setValue(item.id)
      }

    }
  }

  getOfferManuals() {
    this.offerService.getOfferManuals()
      .pipe(first())
      .subscribe(res => {
        this.offerManuals = res.data
      })
  }

  private initForm(): void {
    this.form = this.fb.group({
      category_id: [null],
      subcategory_id: [null],
      sort_type_id: [null],
      type_id: [null],
      city_id: [null],
      region_id: [null],
      size_type_id: [null],
      meterial_type_id: [null],
      amount_max: [null],
      amount_min: [null]
    })

    this.form.controls['category_id'].valueChanges
      .subscribe(category_id => {
        this.form.controls['subcategory_id'].setValue(null)
        this.subCategories = this.cloneCategories.filter(item => item.parent_id === category_id)
      })
  }

  async onSubmit() {
    await this.modalCtrl.dismiss({
      ...this.form.value,
      category_id: this.form.value.subcategory_id ? this.form.value.subcategory_id : this.form.value.category_id
    }, 'confirm')
  }

  clearFilter(): void {
    this.form.reset()
  }
}
