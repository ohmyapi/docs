import { Component, Input, ViewContainerRef } from '@angular/core';
import { DcService } from '../services/dc.service';

@Component({
  selector: 'app-dc',
  standalone: true,
  imports: [],
  template: ``,
  host: {
    class: 'block'
  }
})
export class DcComponent {
  @Input()
  public components: any[] = [];

  constructor(
    private vcr: ViewContainerRef,
    private dcService: DcService
  ) { }

  ngAfterViewInit() {
    this.render(this.components);
  }

  private render(components: any[]) {
    this.dcService.render(components, this.vcr);
  }
}
