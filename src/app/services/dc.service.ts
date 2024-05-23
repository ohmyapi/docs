import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { DcApiListComponent } from '../components/dc-api-list.component';
import { DcApiOneComponent } from '../components/dc-api-one.component';
import { DcCodeComponent } from '../components/dc-code.component';
import { DcHtmlComponent } from '../components/dc-html.component';
import { DcTabsComponent } from '../components/dc-tabs.component';
import { DcTableComponent } from '../components/dc-table.component';
import { DcSupportComponent } from '../components/dc-support.component';

@Injectable({
  providedIn: 'root'
})
export class DcService {

  constructor() { }

  public render(
    components: any[],
    vcr: ViewContainerRef
  ) {
    vcr.clear();

    for (var item of components) {
      const component = item['component'];

      let componentRef!: ComponentRef<any>;

      switch (component) {
        case "html":
          componentRef = vcr.createComponent(DcHtmlComponent);
          break;

        case "api-list":
          componentRef = vcr.createComponent(DcApiListComponent);
          break;

        case "api-one":
          componentRef = vcr.createComponent(DcApiOneComponent);
          break;

        case "code":
          componentRef = vcr.createComponent(DcCodeComponent)
          break;

        case "tabs":
          componentRef = vcr.createComponent(DcTabsComponent);
          break;

        case "table":
          componentRef = vcr.createComponent(DcTableComponent);
          break;

        case "support":
          componentRef = vcr.createComponent(DcSupportComponent);
          break;

        default:
          continue;
      }

      const inputs: any[] = item['inputs'];

      if (inputs && inputs.length != 0) {
        for (var key in inputs) {
          componentRef!.setInput(key, inputs[key]);
        }
      }

      if (item['class']) {
        componentRef.location.nativeElement.classList.add(item['class'].split(' '))
      }

      vcr.insert(componentRef.hostView);
    }
  }
}
