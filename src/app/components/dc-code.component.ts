import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import hljs from 'highlight.js';

@Component({
  selector: 'app-dc-code',
  standalone: true,
  imports: [],
  template: `
    <code class="whitespace-pre overflow-auto h-full" #code></code>

    @if(copyable) {
      <button (click)="copy()" class="btn btn-sm btn-square btn-ghost absolute top-4 right-4 tooltip tooltip-left" data-tip="Copy to clipboard">
        <i class="material-icons-outlined">content_copy</i>
      </button>
    }
  `,
  host: {
    class: 'flex flex-col bg-neutral text-neutral-content p-4 rounded-btn relative'
  }
})
export class DcCodeComponent {
  @Input()
  public value: string = '';

  @Input()
  public language: 'bash' | 'curl' | 'javascript' | 'json' | 'unknown' = 'unknown';

  @Input()
  public copyable: boolean = true;

  @ViewChild('code')
  public code!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.code.nativeElement.innerHTML = hljs.highlight(this.value, {
      language: this.language,
    }).value
  }

  public copy() {
    navigator.clipboard.writeText(this.value);
  }
}
