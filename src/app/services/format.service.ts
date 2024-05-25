import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  public formatActionParamsForForm(params: IActionParams) {
    let form: any[] = [];
    let value: any = {};

    for (var key in params) {
      let item = params[key];

      let data: any = {
        key: key,
        label: key.slice(0, 1).toUpperCase() + key.slice(1),
        type: 'text',
        value: '',
      };

      if (item.type == 'number') {
        data.type = 'number';
        data.value = 0;

        if (item.min) {
          data.min = item.min;
          data.value = data.min;
        }

        if (item.max) {
          data.max = item.max;
        }
      }

      if (item.optional != true) {
        data.required = true;
      }

      if (item.default) {
        data.value = item.default;
      }

      form.push(data);
      value[key] = data.value;
    }

    return {
      form,
      value,
    }
  }
}

interface IActionParams {
  [key: string]: {
    type: 'string' | 'number';
    default?: any;
    optional?: boolean;
    min?: number;
    max?: number;
  }
}
