import { Component } from '@angular/core'
import { OfferService } from '../../../../services/offer.service'
import { UserInterface } from '../../../../models/user.interface'
import { first, switchMap } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { createMask } from '@ngneat/input-mask'
import { LoadingController, Platform, ToastController } from '@ionic/angular'
import { HttpClient } from '@angular/common/http'
import { Camera, CameraResultType } from '@capacitor/camera';

type CurrentPlatform = 'browser' | 'mobile';

export const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});



@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {
  currentUser!: UserInterface
  loading = false
  form!: FormGroup
  inputMask = createMask( '+7 999 999 99 99')
  currentPlatform!: CurrentPlatform

  constructor(
    private offerService: OfferService,
    private fb: FormBuilder,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    private httpClient: HttpClient,
    private platform: Platform
  ) {
    this.setCurrentPlatform()
  }

  private setCurrentPlatform() {
    if (
      this.platform.is('ios')
      || this.platform.is('android')
      && !( this.platform.is('desktop') || this.platform.is('mobileweb') ) ) {
      this.currentPlatform = 'mobile';
    } else {
      this.currentPlatform = 'browser';
    }
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


  async handleFileInput(event: any) {
    const fileToUpload = event.target['files'].item(0);

    const loader = await this.loadingCtrl.create({
      message: 'Загрузка фото',
      duration: 3000,
    });

    const image = await toBase64(fileToUpload);

    this.httpClient
      .post('/uploadPhoto', {
        token: localStorage.getItem('token'),
        image,
      })
      .subscribe(
        (res: any) => {
          loader.dismiss();
          this.getProfile();
        },
        (error: any) => {
          //alert(error);
          loader.dismiss();
        }
      );
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    console.warn(1, image)
    console.log(2, imageUrl)

  };
}
