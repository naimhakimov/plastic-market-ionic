import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../../services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup
  errorMessage = ''
  loading = false

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
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      phone: [null, [Validators.required]],
      name: [null, [Validators.required]]
    })
  }

  onSubmit(): void {
    this.loading = true
    this.errorMessage = ''
    this.authService.register(this.form.value)
      .subscribe({
        next: (res) => {
          this.loading = false
          if (res.error_code === 0) {
            this.form.reset()
            localStorage.setItem('token', res.data.token)
            this.router.navigate(['/dashboard'])
            return
          }
          this.errorMessage = res.message
        }
      })
  }
}
