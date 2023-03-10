import { Component } from '@angular/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Platform } from '@ionic/angular'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      StatusBar.setStyle({ style: Style.Light })
    })
  }

  ionViewWillEnter() {
    StatusBar.setStyle({ style: Style.Light })
  }

}
