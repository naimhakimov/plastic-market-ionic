import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Type } from '../../../models/offer.interface'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder!: string
  @Input() label!: string
  @Input() icon!: string
  @Output() changed = new EventEmitter<any>()

  value = ''
  isDisabled!: boolean

  private propagateChange: any = () => {}
  private propagateTouched: any = () => {}
  @Input() items: Type[] = []

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {}

  writeValue(value: string): void {
    this.value = value
    this.cd.detectChanges();
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

  onChange(value: any): void {
    this.value = value.target?.value
    this.propagateChange(value.target?.value)
    this.changed.emit(value.target?.value)
    this.cd.detectChanges();
  }

  onBlur(): void {
    this.propagateTouched()
  }
}
