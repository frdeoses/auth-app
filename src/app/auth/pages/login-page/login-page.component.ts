import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  myForm: FormGroup = this.fb.group({
    email: ['fran@google.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    // console.log(this.myForm.value);
    const { email, password } = this.myForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (message) => {
        Swal.fire('Error:', message, 'error');
      },
    });
  }
}
