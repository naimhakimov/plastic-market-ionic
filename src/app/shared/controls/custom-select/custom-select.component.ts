import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { ModalController } from '@ionic/angular'
import { SelectModalComponent } from './select-modal/select-modal.component'

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    }
  ]
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() icon!: string
  @Input() label!: string
  @Input() placeholder!: string
  @Input() items: any[] = []
  @Output() changed = new EventEmitter<any>()

  value: any
  name: any
  isDisabled!: boolean

  private propagateChange: any = () => {
  }
  private propagateTouched: any = () => {
  }

  constructor(private modalCtrl: ModalController) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('items')) {
      this.setName()
    }

  }

  ngOnInit() {
  }

  writeValue(value: string): void {
    this.value = value
    this.setName()
  }

  setName(): void {
    if (this.value && this.items.length) {
      this.name = this.items.find(x => +x.id === +this.value)?.name
    } else {
      this.name = null
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }

  onSelect(value: any): void {
    if (value) {
      this.writeValue(value.id)
      this.name = value.name
      this.propagateChange(value?.id)
      this.changed.emit(value?.id)
    }
  }

  async openSelect() {
    const modal = await this.modalCtrl.create({
      component: SelectModalComponent,
      componentProps: {
        defaultValue: this.value,
        items: this.items
      }
    })

    await modal.present()

    const { data } = await modal.onWillDismiss()

    this.onSelect(data)
  }

  onBlur(): void {
    this.propagateTouched()
  }
}
