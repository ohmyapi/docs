import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';
import { DrawerComponent } from './components/drawer.component';
import { FooterComponent } from './components/footer.component';
import { NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, DrawerComponent, NgClass],
  template: `
    <app-header (opened)="opened = !opened" (closed)="opened = false"/>

    <section class="flex flex-nowrap grow z-0">
      <div class="w-screen min-w-[100vw] bg-base-100 md:w-72 md:min-w-72 h-full transition-all fixed md:sticky top-[64px] z-10"
        [ngClass]="{
          '-ms-[100vw] md:ms-0': !opened
        }"
      >
        <app-drawer (closed)="opened = false"/>
      </div>

      <div class="grow border-s overflow-hidden min-w-[100vw] md:min-w-[unset] z-0">
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

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: string,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = new URLSearchParams(window.location.search).get('token');

      if (token) {
        window.localStorage.setItem('#ohmyapi/token', token);
      }
    }
  }
}
