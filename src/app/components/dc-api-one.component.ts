import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormatService } from '../services/format.service';
import { DcCodeComponent } from './dc-code.component';

@Component({
  selector: 'app-dc-api-one',
  standalone: true,
  imports: [FormsModule, DcCodeComponent],
  template: `
    <div class="flex flex-col gap-4">
      @for (item of form; track $index) {
        <div class="form-control">
          <label class="label">
            <span class="label-text text-neutral-content">{{item['label']}}</span>
            @if(item['required']) {
              <span class="label-text-alt text-red-400">Required</span>
            }
          </label>

          @if (item['type'] == 'text') {
            <input [disabled]="disabled" type="text" [(ngModel)]="value[item['key']]" class="input text-neutral" />
          }

          @if (item['type'] == 'number') {
            <input [disabled]="disabled" type="number" [min]="item['min']" [max]="item['max']" [(ngModel)]="item['value']" class="input text-neutral" />
          }
        </div>
      }

      <button (click)="submit()" class="btn btn-primary">
        Submit
      </button>
    </div>

    <div class="text-sm rounded-lg">
      @if(response) {
        <app-dc-code
          language="json"
          [value]="response"
        />
      } @else if(disabled){
        <div class="w-full h-64 flex flex-col items-center justify-center gap-8">
          <span class="loading loading-spinner loading-lg text-neutral-content"></span>
          <strong>Getting Response</strong>
        </div>
      } @else {
        <p class="p-4">Response will be here</p>
      }
    </div>
  `,
  host: {
    class: 'grid md:grid-cols-2 gap-4 bg-neutral text-neutral-content'
  }
})
export class DcApiOneComponent {
  @Input()
  public action: string = '';

  @Input()
  public params: any = {};

  public form: any[] = [];

  public value: any = {};

  public response?: string;

  public disabled: boolean = false;

  constructor(
    private formatService: FormatService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    const { form, value } = this.formatService.formatActionParamsForForm(this.params);

    this.form = form;
    this.value = value;
  }

  public submit() {
    if (this.disabled) return;

    this.disabled = true;
    this.response = undefined;

    const token = window.localStorage.getItem('#ohmyapi/token');

    let headers: any = {};

    if(token) {
      headers['Authorization'] = token;
    }

    this.httpClient.post(`https://api.ohmyapi.com/v1/call/${this.action}`, this.value, {
      headers: headers,
    }).subscribe({
      next: (res) => {
        this.response = JSON.stringify(res, null, 2);
        this.disabled = false;
      },
      error: (err) => {
        if (err.error) {
          this.response = JSON.stringify(err.error, null, 2);
        }
        this.disabled = false;
      }
    });
  }
}
