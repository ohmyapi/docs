import { NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { SearchComponent } from './search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <button (click)="opened.emit()" class="md:hidden btn btn-square btn-ghost">
      <i class="material-icons-outlined">menu</i>
    </button>

    <div class="md:hidden flex-1"></div>

    <a (click)="closed.emit()" routerLink="/">
      <img ngSrc="/assets/icons/icon-192x192.png" alt="ohmyapi logo" width="86" height="86" priority />
    </a>

    <div class="flex-1"></div>

    <button (click)="openSearchDialog()" class="md:hidden btn btn-square btn-ghost">
      <i class="material-icons-outlined">search</i>
    </button>

    <button (click)="openSearchDialog()" class="hidden w-96 h-10 bg-base-200 rounded-btn px-2 md:flex flex-nowrap items-center gap-2 text-gray-400 transition-all hover:bg-base-300">
      <i class="material-icons-outlined">search</i>
      <span>Search...</span>
    </button>

    <div class="hidden md:block flex-1"></div>

    <a href="https://console.ohmyapi.com" class="hidden md:flex btn btn-primary !h-10 !min-h-10">
      Open Console
    </a>
  `,
  host: {
    class: 'block navbar border-b flex flex-nowrap items-center gap-2 h-16 bg-base-100 sticky top-0 z-10'
  }
})
export class HeaderComponent {
  @Output()
  public opened = new EventEmitter<void>();

  @Output()
  public closed = new EventEmitter<void>();

  constructor(
    private dialogService: DialogService
  ) { }

  public openSearchDialog() {
    this.dialogService.open(SearchComponent);
  }
}
