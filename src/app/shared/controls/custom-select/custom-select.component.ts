import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core'
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
export class CustomSelectComponent implements OnInit, ControlValueAccessor {
  @Input() icon!: string
  @Input() label!: string
  @Input() placeholder!: string
  @Input() items: any[] = []
  @Output() changed = new EventEmitter<any>()

  value: any
  isDisabled!: boolean

  private propagateChange: any = () => {
  }
  private propagateTouched: any = () => {
  }

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  writeValue(value: string): void {
    this.value = value
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
    this.value = value
    this.propagateChange(value?.id)
    this.changed.emit(value?.id)
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
