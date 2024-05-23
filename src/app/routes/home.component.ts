import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { DcContentComponent } from '../components/dc-content.component';
import { DcSupportComponent } from '../components/dc-support.component';
import { ContentService } from '../services/content.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DcContentComponent, DcSupportComponent, NgOptimizedImage],
  template: `
    <div class="absolute -top-56 -end-56 bg-primary blur-[250px] rounded-full w-128 h-128"></div>

    <h1 class="font-bold text-5xl mt-10">Meet OhMyAPI Docs</h1>

    <p class="text-xl text-gray-500">
      🤌 Easy ⚡️ Fast 😎 Premium and 😜 Free to use public APIs any where 
    </p>

    <div class="grid md:grid-cols-2 gap-4 w-full mt-10">
      @for (item of contentService.linksAsTree; track $index) {
        <app-dc-content
          icon="{{item['icon']}}"
          text="{{item['text']}}"
          content="{{item['content']}}"
        />
      }
    </div>

    <div class="bg-gradient-to-br from-violet-400 to-gray-200 rounded-btn p-10 w-full md:h-56 grid md:grid-cols-2 gap-10 z-0 overflow-hidden">
      <div class="flex flex-col gap-4">
        <h3 class="font-bold text-xl">API forever and fast</h3>

        <p class="text-gray-700">
          There are many APIs to use for any programming languages, with HTTP request call any APIs you want for free, fast and easy.
        </p>
      </div>

      <img ngSrc="/assets/images/curl.webp" alt="Curl demo of hello world API" width="512" height="512" class="object-center object-contain -mb-20 md:mb-0" />
    </div>

    <span class="w-full text-sm mt-10 ms-2 opacity-75">We can help you</span>
    <app-dc-support />
  `,
  host: {
    class: 'flex flex-col items-center gap-4 mx-4 sm:mx-12 md:mx-24 xl:mx-56 2xl:mx-72 py-10 relative'
  }
})
export class HomeComponent {
  constructor(
    public contentService: ContentService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.seoService.generate({
      title: 'OhMyAPI Docs',
      description: 'Easy, Fast, Premium and Free to use public APIs any where',
      canonical: 'https://docs.ohmyapi.com'
    })
  }
}
