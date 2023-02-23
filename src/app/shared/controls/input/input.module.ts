import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputComponent } from './input.component'
import { InputMaskModule } from '@ngneat/input-mask'

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, InputMaskModule],
  exports: [InputComponent],
})
export class InputModule {}
