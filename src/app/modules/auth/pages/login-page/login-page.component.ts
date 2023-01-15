import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../../services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initForm()
  }


  private initForm(): void {
    this.form = this.fb.group({
      login: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(): void {
    this.authService.login(this.form.value)
      .subscribe(res => {
        this.form.reset()
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)
        this.router.navigate(['/dashboard'])
      })
  }
}
