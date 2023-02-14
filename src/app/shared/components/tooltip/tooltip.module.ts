import { NgModule } from '@angular/core'
import { TooltipComponent } from './tooltip.component'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [TooltipComponent],
  exports: [TooltipComponent]
})
export class TooltipModule {
}
