import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { DrawerComponent } from './components/drawer.component';
import { FooterComponent } from './components/footer.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, DrawerComponent, NgClass],
  template: `
    <app-header (opened)="opened = !opened"/>

    <section class="flex flex-nowrap grow z-0">
      <div class="w-screen min-w-[100vw] md:w-72 md:min-w-72 h-full transition-all"
        [ngClass]="{
          '-ms-[100vw] md:ms-0': !opened
        }"
      >
        <app-drawer (closed)="opened = false"/>
      </div>

      <div class="grow border-s overflow-hidden min-w-[100vw] md:min-w-[unset]">
        <router-outlet />

        <app-footer />
      </div>
    </section>
  `,
  host: {
    class: 'flex flex-col min-h-full w-full'
  }
})
export class AppComponent {
  public opened: boolean = false;
}
