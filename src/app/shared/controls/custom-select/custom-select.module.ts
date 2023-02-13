import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomSelectComponent } from './custom-select.component'
  import { FormsModule } from '@angular/forms'
import { SelectModalComponent } from './select-modal/select-modal.component'

@NgModule({
  declarations: [
    CustomSelectComponent,
    SelectModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomSelectComponent,
    SelectModalComponent
  ]
})
export class CustomSelectModule {}
