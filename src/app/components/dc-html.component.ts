import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-dc-html',
  standalone: true,
  imports: [],
  template: ``,
  host: {
    class: 'block'
  }
})
export class DcHtmlComponent {
  @Input()
  public value: string = '';

  constructor(
    private vcr: ViewContainerRef,
  ) { }

  ngAfterViewInit() {
    this.vcr.element.nativeElement.innerHTML = this.value;
  }
}
