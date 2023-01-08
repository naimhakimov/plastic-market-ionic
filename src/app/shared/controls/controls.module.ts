import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputModule } from './input/input.module'
import { SelectModule } from './select/select.module'
import { CustomSelectModule } from './custom-select/custom-select.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, InputModule, SelectModule, CustomSelectModule],
})
export class ControlsModule {}
