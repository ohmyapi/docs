import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="absolute -top-56 -end-56 bg-error blur-[250px] rounded-full w-128 h-128"></div>
    
    <strong class="text-[10rem] text-error">404</strong>
    
    <p class="font-bold text-xl">Content not found</p>

    <a routerLink="/" class="btn btn-outline border-base-300 hover:btn-error">
      Back to home
    </a>
  `,
  host: {
    class: 'flex flex-col items-center justify-center gap-6'
  }
})
export class NotFoundComponent {

}
