import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { OfferService } from '../../../../services/offer.service'
import { AlertController } from '@ionic/angular'
import { first } from 'rxjs'
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private alertController: AlertController,
    private router: Router
  ) { }

  private _initForm(): void {
    this.form = this.fb.group({
      email: [null ,[Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
    this._initForm()
  }

  onSubmit(): void {
    this.offerService.resetPassword(this.form.value.email)
      .pipe(first())
      .subscribe(res => {
        if (+res.error_code === 0) {
          this.alert()
        }
      })
  }

  async alert() {

    let alert = await this.alertController.create({
      header: 'Успешно!!!',
      buttons: ['OK'],
      message: 'На указанный Email было отправлено письмо с паролю.'
    })

    alert.onWillDismiss().then(() => this.router.navigate(['/auth/login']))

    await alert.present()
  }
}
