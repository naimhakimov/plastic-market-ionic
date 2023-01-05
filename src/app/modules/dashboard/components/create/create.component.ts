import { Component, OnInit } from '@angular/core'
import { AlertController, ModalController } from '@ionic/angular'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private alertController: AlertController) {
  }

  ngOnInit() {
  }

  async openSelect() {
    const alert = await this.alertController.create({
      header: 'Select your favorite color',
      buttons: ['OK'],
      inputs: [
        {
          label: 'Red',
          type: 'radio',
          value: 'red'
        },
        {
          label: 'Blue',
          type: 'radio',
          value: 'blue'
        },
        {
          label: 'Green',
          type: 'radio',
          value: 'green'
        }
      ]
    })

    await alert.present()

    const { data } = await alert.onWillDismiss()

    console.log(data)
  }
}
