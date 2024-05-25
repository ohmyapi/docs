import { DialogRef } from '@angular/cdk/dialog';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, FormsModule, NgClass],
  template: `
    <header class="relative w-full h-32 mb-4 flex items-center justify-center overflow-hidden">
      <div class="absolute -top-20 left-0 w-36 h-36 rounded-full blur-xl bg-sky-400"></div>
      <div class="absolute -bottom-14 -left-10 w-36 h-36 rounded-full blur-xl bg-yellow-400"></div>
      <div class="absolute -top-14 -right-10 w-36 h-36 rounded-full blur-xl bg-pink-400"></div>
      <div class="absolute -bottom-20 right-0 w-36 h-36 rounded-full blur-xl bg-violet-400"></div>

      <img ngSrc="/assets/icons/icon-192x192.png" alt="ohmyapi logo" width="86" height="86" priority />

      <button (click)="close()" class="btn btn-sm btn-square btn-ghost absolute top-2 right-2">
        <i class="material-icons-outlined">close</i>
      </button>
    </header>

    <form [formGroup]="form" (submit)="submit()" class="flex flex-col gap-2 mx-4">
      <label dir="ltr" class="input input-bordered focus-within:input-primary flex items-center gap-2" [ngClass]="{'input-error': form.get('email')!.touched && form.get('email')!.invalid}">
        <i class="material-icons-outlined text-gray-500">email</i>
        <input formControlName="email" type="email" name="ohmyapi-email" placeholder="Your email address" class="grow placeholder:text-gray-500"/>
      </label>
    
      <label dir="ltr" class="input input-bordered focus-within:input-primary flex items-center gap-2" [ngClass]="{'input-error': form.get('password')!.touched && form.get('password')!.invalid}">
        <i class="material-icons-outlined text-gray-500">password</i>
        <input formControlName="password" type="password" name="ohmyapi-password" placeholder="Your password" class="grow placeholder:text-gray-500"/>
      </label>

      <button type="submit" (click)="submit()" [disabled]="form.disabled" class="btn btn-primary mt-4">
        @if(form.disabled) {
          <span class="loading loading-spinner loading-xs"></span>
        } @else {
          <span>Login</span>
        }
      </button>
    </form>

    <div class="divider mx-4">or</div>

    <label dir="ltr" class="input input-bordered focus-within:input-primary flex items-center gap-2 mx-4 mb-4">
      <i class="material-icons-outlined text-gray-500">key</i>
      <input [(ngModel)]="token" (ngModelChange)="saveToken()" type="text" name="ohmyapi-token" placeholder="Access token" class="grow placeholder:text-gray-500"/>
    </label>
  `,
  host: {
    class: 'w-96 rounded-xl overflow-hidden bg-base-100 shadow-xl'
  }
})
export class AuthComponent {
  public form: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  public token: string = '';

  constructor(
    private httpClient: HttpClient,
    private ref: DialogRef
  ) { }

  ngOnInit() {
    this.token = window.localStorage.getItem('#ohmyapi/token')!;
  }

  public close() {
    this.ref.close();
  }

  public submit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.form.disable();

      const value = this.form.value;

      this.httpClient.post('https://api.ohmyapi.com/v1/call/api.v1.ohmyapi.auth.login', value).subscribe({
        next: (res: any) => {
          this.form.enable();

          if (res['status']) {
            const token = res['data']['token'];

            this.token = token;
            this.saveToken();
          }
        },
        error: () => {
          this.form.enable();
        }
      });
    }
  }

  public saveToken() {
    window.localStorage.setItem('#ohmyapi/token', this.token);
  }
}
