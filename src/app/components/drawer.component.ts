import { Component, EventEmitter, Output } from '@angular/core';
import { ContentService } from '../services/content.service';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [RouterLink],
  template: `
    @for (item of contentService.linksAsTree; track $index) {
      <a (click)="closed.emit()" routerLink="/{{item['content']}}" class="btn btn-ghost justify-start gap-4 mb-2">
        <i class="material-icons-outlined">{{item['icon']}}</i>

        <span>{{item['text']}}</span>
      </a>

      @for (item of item['children']; track $index) {
        <a (click)="closed.emit()" routerLink="/{{item['content']}}" class="btn btn-sm btn-ghost justify-start font-normal text-base-content text-opacity-60">
          <i class="block w-6 h-6 me-3"></i>

          <span>{{item['text']}}</span>
        </a>
      }
    }

    <div class="flex-1"></div>

    <a href="https://console.ohmyapi.com" class="md:hidden btn btn-primary">
      Open Console
    </a>
  `,
  host: {
    class: 'flex flex-col w-full h-[calc(100dvh-64px)] p-2 overflow-y-scroll'
  }
})
export class DrawerComponent {
  @Output()
  public closed = new EventEmitter<void>();

  constructor(
    public contentService: ContentService
  ) { }

  ngOnInit() {
    this.loadLinks();
  }

  private loadLinks() {
    lastValueFrom(this.contentService.links)
  }
}
