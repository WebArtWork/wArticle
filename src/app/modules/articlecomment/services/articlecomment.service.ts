import { inject, Injectable } from "@angular/core";
import { HelperService } from "src/app/core/services/helper.service";
import {
  AlertService,
  CoreService,
  HttpService,
  StoreService,
  CrudService,
  CrudDocument,
} from "wacom";

export interface Articlecomment extends CrudDocument {
  content: string;
  article: string;
}

@Injectable({
  providedIn: "root",
})
export class ArticlecommentService extends CrudService<Articlecomment> {
  _helper = inject(HelperService)

  articlecomments: Articlecomment[] = [];

  commentsByArticleId: Record<string, Articlecomment[]> = {}
  setCommentsByArticleId = this._helper.createParentIdToChildrenIds<Articlecomment[]>(this.commentsByArticleId, this.articlecomments, 'article')

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

    this.get().subscribe((articlecomments: Articlecomment[]) => {
      this.articlecomments.push(...articlecomments)
    
      this.setCommentsByArticleId()
    });

    _core.on("articlecomment_create").subscribe((articlecomment: Articlecomment) => {
      this.articlecomments.push(articlecomment);

      this.setCommentsByArticleId()
    });

    _core.on("articlecomment_delete").subscribe((articlecomment: Articlecomment) => {
      this.articlecomments.splice(
        this.articlecomments.findIndex((o) => o._id === articlecomment._id),
        1
      );

      this.setCommentsByArticleId()
    });
  }
}
