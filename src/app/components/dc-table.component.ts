import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dc-table',
  standalone: true,
  imports: [],
  template: `
      <table class="table whitespace-pre">
        <!-- head -->
        <thead>
          <tr class="bg-base-200">
            @for (item of head; track $index) {
              <th>{{item}}</th>
            }
          </tr>
        </thead>

        <tbody>
          @for (row of rows; track $index) {
            <tr>
              @for (item of row; track $index) {
                <td>{{item}}</td>
              }
            </tr>
          }
        </tbody>
      </table>
  `,
  host: {
    class: 'block w-full overflow-x-auto rounded-t-btn'
  }
})
export class DcTableComponent {
  @Input()
  public head: string[] = [];

  @Input()
  public rows: any[][] = [];
}
