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
    this.authService.register(this.form.value)
      .subscribe({
        next: (res) => {
          this.form.reset()
          localStorage.setItem('token', res.data.token)
          this.router.navigate(['/dashboard'])
        }
      })
  }
}
