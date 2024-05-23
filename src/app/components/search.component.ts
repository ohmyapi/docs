import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from '../services/content.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="flex flex-nowrap items-center gap-4 h-14 px-4" [class.border-b]="links.length != 0">
      <i class="material-icons-outlined text-gray-500">search</i>

      <input [(ngModel)]="search" (ngModelChange)="searching()" autofocus type="text" placeholder="Search..." class="grow outline-none placeholder:text-gray-500">
      
      <i (click)="search = ''; searching()" class="material-icons-outlined scale-75 text-gray-500 cursor-pointer" [class.!hidden]="search.length == 0">
        cancel
      </i>
    </div>

    @for (item of links; track $index) {
      <a (click)="close()" routerLink="/{{item['content']}}" class="px-6 py-4 flex flex-nowrap items-center gap-4 transition-all hover:bg-base-200">
        <div class="flex flex-col gap-1 flex-1">
          <span class="flex-1 text-sm text-start">{{item['text']}} - OhMyAPI Docs</span>

          <span class="text-xs text-gray-500">/{{item['content']}}</span>
        </div>

        <i class="material-icons-outlined">chevron_right</i>
      </a>
    }
  `,
  host: {
    class: 'fixed -top-64 bg-base-100 text-base-content rounded-btn w-128 flex flex-col overflow-hidden shadow'
  }
})
export class SearchComponent {
  public search: string = ''

  public links: any[] = [];

  constructor(
    private contentService: ContentService,
    private ref: DialogRef
  ) { }

  public searching() {
    if (this.search.length < 2) {
      this.links = [];
      return;
    }

    this.links = this.contentService.linksAsArray.filter((item) => item['text'].toLowerCase().includes(this.search.toLowerCase())).slice(0, 5);
  }

  public close() {
    this.ref.close();
  }
}
