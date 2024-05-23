import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <div class="absolute -top-6 left-1/2 -translate-x-1/2">
      <button (click)="up()" class="btn btn-circle bg-base-100 outline outline-8 outline-base-100">
        <i class="material-icons-outlined">expand_less</i>
      </button>
    </div>

    <strong>OhMyAPI Docs</strong>
    
    <span class="block w-1 h-1 rounded-full bg-base-300"></span>

    <span class="text-gray-500">
      © 2024 All rights reserved
    </span>

    <div class="flex-1"></div>

    <a href="https://ohmyapi.com/terms" class="z-0 underline">Terms of service</a>
  `,
  host: {
    class: 'flex flex-col md:flex-row items-center gap-4 mx-4 sm:mx-12 md:mx-24 xl:mx-56 2xl:mx-72 py-10 text-sm border-t relative'
  }
})
export class FooterComponent {
  constructor(
    @Inject(DOCUMENT)
    private document: Document
  ) { }

  public up() {
    this.document.querySelector('html')!.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
