import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dc-content',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/{{content}}" class="bg-base-200/70 backdrop-blur rounded-btn p-8 w-full flex flex-nowrap items-center gap-4 transition-all hover:bg-base-300">
      <i class="material-icons-outlined">{{icon}}</i>

      <span class="flex-1 text-start">{{text}}</span>

      <i class="material-icons-outlined">chevron_right</i>
    </a>
  `,
  host: {
    class: 'block w-full'
  }
})
export class DcContentComponent {
  @Input()
  public text: string = '';

  @Input()
  public content: string = '';

  @Input()
  public icon: string = 'insert_drive_file';
}
