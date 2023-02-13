import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomSelectComponent } from './custom-select.component'
  import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SelectModalComponent } from './select-modal/select-modal.component'
import { IonicModule } from '@ionic/angular'

@NgModule({
  declarations: [
    CustomSelectComponent,
    SelectModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    CustomSelectComponent,
    SelectModalComponent
  ]
})
export class CustomSelectModule {}
