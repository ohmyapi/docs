import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotFoundComponent } from '../components/404.component';
import { DcContentComponent } from '../components/dc-content.component';
import { DcComponent } from '../components/dc.component';
import { ContentService } from '../services/content.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterLink, NotFoundComponent, DcComponent, DcContentComponent],
  template: `
    @if(notFound) {
      <app-404 />
    }

    @if(color) {
      <div [style.background]="color" class="absolute -top-36 -end-48 blur-[200px] rounded-full w-96 h-96 z-[-1]"></div>
    }

    @if(meta) {
      <section class="flex flex-col gap-4 z-10">
        <h2 class="font-bold text-2xl">{{meta['title']}}</h2>

        <p class="text-base-content/70 text-xl">{{ meta['summary']}} </p>
      </section>    
    }

    @if(components.length != 0) {
      <app-dc class="z-10" [components]="components" />
    }

    @if(contents.length != 0) {
      <span class="text-sm mb-2 ms-2 text-gray-500">More contents</span>

      <div class="grid md:grid-cols-2 gap-4">
        @for (item of contents; track $index) {
          <app-dc-content 
            text="{{item['text']}}"
            content="{{item['content']}}"
          />
        }
      </div>
    }

    <!-- more links -->
    @if(links.length != 0) {
      <div class="divider"></div>

      <div class="grid md:grid-cols-2 gap-4">
        @if(links[0]) {
          <a routerLink="/{{links[0]['content']}}" class="bg-base-100 rounded-btn p-4 flex flex-nowrap items-center gap-8 transition-all hover:bg-base-200">
            <i class="material-icons-outlined text-gray-400">chevron_left</i>

            <div class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">Prev</span>
              <strong>{{links[0]['text']}}</strong>
            </div>
          </a>
        } @else {
          <div></div>
        }

        @if(links[1]) {
          <a routerLink="/{{links[1]['content']}}" class="bg-base-100 rounded-btn p-4 flex flex-nowrap items-center justify-end gap-8 transition-all hover:bg-base-200">
            <div class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">Next</span>
              <strong>{{links[1]['text']}}</strong>
            </div>
            <i class="material-icons-outlined text-gray-400">chevron_right</i>
          </a>
        } @else {
          <div></div>
        }
      </div>
    }
  `,
  host: {
    class: 'flex flex-col gap-2 mx-4 sm:mx-12 md:mx-24 xl:mx-56 2xl:mx-72 py-10 relative'
  }
})
export class ContentComponent {
  public notFound: boolean = false;

  public color?: string;
  public key: string = '';
  public meta: any;

  // next, prev link
  public links: any[] = [];
  // sub contents
  public contents: any[] = [];
  // components
  public components: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contentService: ContentService,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.loadContent(params['key']);
      this.loadContents(params['key']);
      this.loadMoreLinks(params['key']);
    })
  }

  private loadContent(key: string) {
    this.key = key;
    this.meta = undefined;
    this.components = [];

    this.contentService.content(key).subscribe({
      next: (res: any) => {
        this.notFound = false;

        this.color = res['color'];
        this.meta = res['meta'];
        this.components = res['components'];

        this.loadContents(key);
        this.loadMoreLinks(key);

        this.makeSEO();
      },
      error: () => {
        this.notFound = true;
        this.components = [];
      }
    })
  }

  private loadMoreLinks(key: string) {
    this.links = [];

    const index = this.contentService.linksAsArray.findIndex((item) => item['content'] == key);

    if (index - 1 != -1) {
      this.links.push(this.contentService.linksAsArray[index - 1])
    } else {
      this.links.push(undefined)
    }

    if (index + 1 != this.contentService.linksAsArray.length) {
      this.links.push(this.contentService.linksAsArray[index + 1])
    } else {
      this.links.push(undefined)
    }
  }

  private loadContents(key: string) {
    this.contents = this.contentService.linksAsArray.filter((item) => item['parent'] == key);
  }

  private makeSEO() {
    this.seoService.generate({
      title: this.meta['title'] + ' - OhMyAPI Docs',
      description: this.meta['summary'] ?? '',
      canonical: `https://docs.ohmyapi.com/${this.key}`
    });
  }
}
