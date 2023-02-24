import { Component } from '@angular/core'
import { OfferService } from '../../../../services/offer.service'
import { UserInterface } from '../../../../models/user.interface'
import { first } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { createMask } from '@ngneat/input-mask'
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  currentUser!: UserInterface
  loading = false
  form!: FormGroup
  inputMask = createMask('+[9 ]999 999 999')

  constructor(
    private offerService: OfferService,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      password: [null, Validators.minLength(6)],
      description: [null]
    })
  }

  ionViewDidEnter() {
    this.initForm()
    this.getProfile()
  }

  private getProfile(): void {
    this.offerService.getProfile()
      .pipe(first())
      .subscribe(res => {
        const currentUser = this.currentUser = res.data.user
        localStorage.setItem('user', JSON.stringify(currentUser))
        this.form.patchValue({
          name: currentUser?.name,
          email: currentUser?.email,
          phone: currentUser?.phone,
          password: null,
          description: currentUser?.description
        })
      })
  }


  onSubmit(): void {
    this.loading = true
    this.offerService.updateProfile(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.getProfile()
        this.loading = false
        this.presentToast();
      })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Успешно обновлено',
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    await toast.present();
  }

  errorAvatar(event: any): void {
    event.target['src'] = 'https://vyshnevyi-partners.com/wp-content/uploads/2016/12/no-avatar.png'
  }
}
