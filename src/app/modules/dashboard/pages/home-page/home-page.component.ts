import { Component } from '@angular/core'
import { ProductsComponent } from '../products/products.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  component = ProductsComponent
}
