import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { DcService } from '../services/dc.service';
import { DcComponent } from './dc.component';

@Component({
  selector: 'app-dc-tabs',
  standalone: true,
  imports: [DcComponent],
  template: `
    <div role="tablist" class="tabs tabs-lifted">
      @for (item of values; track $index) {
        <input type="radio" (click)="setTabByIndex($index)" [checked]="item['active'] == true" role="tab" name="{{name}}" id="{{name}}-{{$index}}" [class.before:!content-none]="values.length == 1" class="tab [--tab-bg:var(--fallback-n,oklch(var(--n)))] [--tab-border-color:transparent] checked:[--tab-border-color:var(--fallback-n,oklch(var(--n)))] [--tab-color:var(--fallback-n,oklch(var(--n)))] checked:[--tab-color:var(--fallback-nc,oklch(var(--nc)))]" [attr.aria-label]="item['tab']"/>
      }
    </div>

    <div role="tabpanel" class="rounded-box bg-neutral text-neutral-content -mt-[1px]">
      <div #content></div>
    </div>
  `,
  host: {
    class: 'block'
  }
})
export class DcTabsComponent {
  @Input()
  public name: string = 'tab';

  @Input()
  public values: any[] = [];

  @ViewChild('content', { read: ViewContainerRef })
  public content!: ViewContainerRef;

  constructor(
    private dcService: DcService
  ) { }

  ngAfterViewInit() {
    const tab = this.values.findIndex((item) => item['active'] == true);

    this.setTabByIndex(tab != -1 ? tab : 0);
  }

  public setTabByIndex(index: number = 0) {
    const element: HTMLDivElement = this.content.element.nativeElement.parentElement;

    if (index == 0) {
      element.classList.add('rounded-tl-none');
    } else {
      element.classList.remove('rounded-tl-none');
    }

    if (index == this.values.length - 1) {
      element.classList.add('rounded-tr-none');
    } else {
      element.classList.remove('rounded-tr-none');
    }

    this.render(this.values[index]['components'])
  }

  private render(components: any[] = []) {
    this.dcService.render(components, this.content);
  }
}
