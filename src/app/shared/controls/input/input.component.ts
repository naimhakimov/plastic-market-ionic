import {
  Component,
  OnInit,
  forwardRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import { InputmaskOptions } from '@ngneat/input-mask'

type Type = 'text' | 'email' | 'password' | 'number'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string
  @Input() icon!: string
  @Input() type: Type = 'text'
  @Input() inputMask!: InputmaskOptions<any>
  @Output() changed = new EventEmitter<string>()

  value: string | null = null
  isDisabled!: boolean

  private propagateChange: any = () => {
  }
  private propagateTouched: any = () => {
  }

  ngOnInit(): void {
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

  onKeyup(value: any): void {
    this.value = value.target?.value
    this.propagateChange(value.target?.value)
    this.changed.emit(value.target?.value)
  }

  onBlur(): void {
    this.propagateTouched()
  }
}
