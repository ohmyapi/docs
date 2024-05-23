import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DcCodeComponent } from './dc-code.component';

@Component({
  selector: 'app-dc-api-list',
  standalone: true,
  imports: [FormsModule, DcCodeComponent],
  template: `
    <div class="flex flex-nowrap items-center gap-4 bg-base-200 rounded-btn h-14 px-4">
      <i class="material-icons-outlined text-gray-500">search</i>
      
      <input [(ngModel)]="search" (ngModelChange)="onFilterChange()" type="text" placeholder="Search for API" class="grow outline-none bg-transparent placeholder:text-gray-500"/>
    </div>

    @if(data.length == 0 && total == 0) {
      <div class="flex flex-col items-center justify-center gap-4 h-96">
        <span class="loading loading-spinner loading-lg text-primary"></span>

        <span>Loading APIs</span>
      </div>
    }
    @else {
      <div class="border-b p-2 text-sm flex flex-nowrap items-center gap-2 mb-4">
        <span class="badge badge-success badge-xs animate-pulse"></span>
        <p>We have <span class="text-primary">{{total}}</span> APIs available for now</p>
       </div>

        <div class="flex flex-col gap-2">
          @for (item of data; track $index) {
            <div class="border rounded-btn flex flex-col transition-all hover:shadow">
              <div class="flex flex-nowrap items-center gap-2 p-4 cursor-pointer" (click)="item['opened'] = item['opened'] ? false : true">
                <div class="flex flex-col gap-1 grow">
                  <strong>{{item['name']}}</strong>
                  <p class="text-sm text-gray-500">{{item['description']}}</p>
                </div>

                @if(item['price']) {
                  @if(item['price']['type'] == 'free') {
                    <div class="badge badge-success">FREE</div>
                  }

                  @if(item['price']['type'] == 'fixed') {
                    <div class="badge badge-warning">{{item['price']['amount']}}</div>
                  }
                }

                <button class="btn btn-sm btn-ghost btn-circle">
                  <i class="material-icons-outlined">
                    {{ item['opened'] ? 'remove' : 'add' }}
                  </i>
                </button>
              </div>

              @if(item['opened']) {
                <div class="carousel carousel-center gap-2 px-4 text-xs overflow-y-scroll">
                  <div class="carousel-item border rounded-lg p-2 flex flex-col gap-1 col-span-2 min-w-96 relative">
                    <span>Call</span>
                    <strong>{{item['name']}}</strong>

                    <button (click)="copyToClipboard(item['name'])" class="btn btn-sm btn-ghost btn-circle absolute right-2 top-3 tooltip tooltip-left" data-tip="Copy to clipboard">
                      <i class="material-icons-outlined scale-75">content_copy</i>
                    </button>
                  </div>

                  @if(item['permissions'] && item['permissions'].length != 0) {
                    <div class="carousel-item border rounded-lg p-2 flex flex-col gap-1 min-w-32">
                      <span>Permissions</span>
                      <strong>{{item['permissions'].join(' , ')}}</strong>
                    </div>
                  }

                  <div class="carousel-item border rounded-lg p-2 flex flex-col gap-1 min-w-32">
                    <span>Nodes</span>
                    <strong>{{item['nodes'].join(' , ')}}</strong>
                  </div>

                  @if(item['price']) {
                    <div class="carousel-item border rounded-lg p-2 flex flex-col gap-1 min-w-32">
                      <span>Price</span>
                      @if(item['price']['type'] == 'fixed') {
                        <strong>{{item['price']['amount']}} OhMyCoin</strong>
                      } @else {
                        <strong>Free</strong>
                      }
                    </div>
                  }
                </div>

                <div role="tablist" class="tabs tabs-lifted m-4">
                  <input type="radio" name="api-content-{{$index}}" role="tab" class="tab peer [--tab-bg:var(--fallback-n,oklch(var(--n)))] [--tab-border-color:var(--fallback-n,oklch(var(--n)))] [--tab-color:var(--fallback-n,oklch(var(--n)))] checked:[--tab-color:var(--fallback-nc,oklch(var(--nc)))]" aria-label="Parameters" checked />
                  <div role="tabpanel" class="tab-content bg-neutral rounded-lg peer-checked:!rounded-tl-none">
                    <app-dc-code
                      language="json"
                      value="{{formatParams(item['params'])}}"
                    />
                  </div>

                  <input type="radio" name="api-content-{{$index}}" role="tab" class="tab [--tab-bg:var(--fallback-n,oklch(var(--n)))] [--tab-border-color:var(--fallback-n,oklch(var(--n)))] [--tab-color:] checked:[--tab-color:var(--fallback-nc,oklch(var(--nc)))]" aria-label="Javascript" />
                  <div role="tabpanel" class="tab-content bg-neutral rounded-lg">
                    <app-dc-code
                      language="javascript"
                      value="{{formatJavascript(item)}}"
                    />
                  </div>
                </div>
              }
            </div>
          }
        </div>
    }
  `,
  host: {
    class: 'flex flex-col gap-2 w-full'
  }
})
export class DcApiListComponent {
  private actions: any[] = [];

  public total: number = 0;

  public search: string = '';

  public data: any[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.loadAllActions();
  }

  public onFilterChange() {
    this.data = this.actions.filter((item) => item['name'].toLowerCase().includes(this.search.toLowerCase()));
  }

  public formatParams(params: any = {}) {
    return JSON.stringify(params, null, 2);
  }

  public formatJavascript(item: any) {
    let data: any = {
      action: item['name']
    };

    if (item['params']) {
      data['params'] = item['params'];
    }

    return `ohmyapi.call(${this.formatParams(data)})`;
  }

  public copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  private loadAllActions() {
    this.httpClient.get('https://api.ohmyapi.com/v1/action').subscribe({
      next: (res: any) => {
        this.actions = res['data'];
        this.data = res['data'];
        this.total = res['meta']['total'];
      }
    })
  }
}
