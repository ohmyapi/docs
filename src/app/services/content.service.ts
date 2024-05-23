import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public linksAsTree: any[] = [];
  public linksAsArray: any[] = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  public get links() {
    return this.httpClient.get(`/assets/content/en/links.json`).pipe(tap((res) => {
      this.linksAsTree = res as any[];

      for (var link of this.linksAsTree) {
        this.linksAsArray.push({
          ...link,
          children: undefined,
          parent: undefined
        });

        this.linksAsArray.push(
          ...link['children'].map((item: any) => ({
            ...item,
            children: undefined,
            parent: link['content'],
          })),
        );
      }

    }));
  }

  public content(key: string) {
    return this.httpClient.get(`/assets/content/en/${key}.json`);
  }
}
