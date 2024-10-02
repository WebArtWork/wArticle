import { Injectable } from "@angular/core";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Articlecomment extends CrudDocument {
  name: string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class ArticlecommentService extends CrudService<Articlecomment> {
  articlecomments: Articlecomment[] = [];
  constructor(
    _http: HttpService,
    _store: StoreService,
    _alert: AlertService,
    _core: CoreService
  ) {
    super(
      {
        name: "articlecomment",
      },
      _http,
      _store,
      _alert,
      _core
    );

    this.get().subscribe((articlecomments: Articlecomment[]) => this.articlecomments.push(...articlecomments));

    _core.on("articlecomment_create").subscribe((articlecomment: Articlecomment) => {
      this.articlecomments.push(articlecomment);
    });

    _core.on("articlecomment_delete").subscribe((articlecomment: Articlecomment) => {
      this.articlecomments.splice(
        this.articlecomments.findIndex((o) => o._id === articlecomment._id),
        1
      );
    });
  }
}
