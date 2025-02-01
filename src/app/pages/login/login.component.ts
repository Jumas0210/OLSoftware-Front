import { Component, inject } from '@angular/core';
import { HeaderLoginComponent } from "./components/header-login/header-login.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderLoginComponent, FormsModule, ReactiveFormsModule],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export  class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  public loginForm: FormGroup = new FormGroup({
    user : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required]),
    acceptTerms: new FormControl(false, [Validators.requiredTrue])
  });

  public login(){

    if(this.loginForm.valid){
      const {user, password} = this.loginForm.value;

      this.authService.login(user,password).subscribe({
        next:(resp) =>{
          localStorage.setItem('token', resp.token);
          localStorage.setItem('name', resp.name);
          localStorage.setItem('rol', resp.rol);
          this.router.navigate(['/dashboard'])
        },
        error:(err) => {
            console.log('Eror en la autenticacion')
        },
      })
    }


   
  }
}
