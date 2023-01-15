import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { AlertController } from '@ionic/angular'

export interface Item {
  label: string;
  type: 'radio',
  value: string | number
}

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
export class CustomSelectComponent implements OnInit {
  @Input() icon!: string
  @Input() label!: string
  @Input() items: Item[] = []
  @Output() changed = new EventEmitter<any>()

  value: any
  isDisabled!: boolean

  private propagateChange: any = () => {
  }
  private propagateTouched: any = () => {
  }

  constructor(private alertController: AlertController) {
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
    this.propagateChange(value)
    this.changed.emit(value)
  }

  async openSelect() {
    const alert = await this.alertController.create({
      buttons: ['OK'],
      inputs: this.items
    })

    await alert.present()

    const { data } = await alert.onWillDismiss()

    this.onSelect(data.values)
  }

  onBlur(): void {
    this.propagateTouched()
  }
}
