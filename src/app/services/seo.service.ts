import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';


export interface ISEOContent {
  title: string;
  description: string;
  url: string;
  siteName: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageType?: string;
  type?: string;
  twitterCard?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    @Inject(DOCUMENT)
    private readonly document: Document,
  ) { }

  public generate(params: IGenerateParams) {
    this.clearHeadDOM();

    // robots
    this.createHeadDOM({
      type: 'meta',
      attr: {
        name: 'robots',
        content: 'index, follow'
      }
    });

    // copyright
    this.createHeadDOM({
      type: 'meta',
      attr: {
        name: 'copyright',
        content: 'All rights reserved for OhMyAPI group'
      }
    });

    // og
    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:type',
        content: 'website'
      },
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:image',
        content: 'https://docs.ohmyapi.com/assets/icons/icon-96x96.png'
      }
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:image:width',
        content: '96'
      }
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:image:height',
        content: '96'
      }
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'ogimage::type',
        content: 'image/png'
      }
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:image:alt',
        content: 'OhMyAPI documention logo'
      }
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:site_name',
        content: 'OhMyAPI'
      }
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:locale',
        content: 'en_GB'
      }
    });

    // title
    this.setTitle(params.title);

    this.createHeadDOM({
      type: 'meta',
      attr: {
        name: 'title',
        content: params.title
      },
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:title',
        content: params.title
      },
    });

    // canonical
    this.createHeadDOM({
      type: 'link',
      attr: {
        rel: 'canonical',
        href: params.canonical
      }
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:url',
        content: params.canonical
      }
    });

    // description
    this.createHeadDOM({
      type: 'meta',
      attr: {
        name: 'description',
        content: params.description
      },
    });

    this.createHeadDOM({
      type: 'meta',
      attr: {
        property: 'og:description',
        content: params.description
      },
    });
  }

  public setTitle(title: string) {
    this.document.title = title;
  }

  public createHeadDOM(params: IHeadDomParams, id: string = 'seo-head') {
    const element = this.document.createElement(params.type);

    if (params.attr) {
      const keys = Object.keys(params.attr);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        let value = params.attr[key];

        element.setAttribute(key, value);
      }
    }

    if (params.content) {
      element.textContent = params.content;
    }

    element.id = id;

    this.document.head.appendChild(element);
  }

  public clearHeadDOM(id: string = 'seo-head') {
    // remove all elements by 'seo-head' id
    const elements = this.document.head.querySelectorAll(`#${id}`);
    elements.forEach((element) => {
      element.parentElement!.removeChild(element);
    });
  }
}


interface IHeadDomParams {
  type: 'meta' | 'link' | 'script' | 'style';
  attr: {
    [key: string]: string;
  };
  content?: string;
}

interface IGenerateParams {
  title: string;
  description: string;
  canonical: string;
}