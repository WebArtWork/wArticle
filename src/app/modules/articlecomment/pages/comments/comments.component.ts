import { Component } from "@angular/core";
import { AlertService, CoreService } from "wacom";
import { ArticlecommentService, Articlecomment } from "../../services/articlecomment.service";
import { FormService } from "src/app/core/modules/form/form.service";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent {
  columns = ["content"];

  articleId = this._router.url.includes('/comments/') ? this._router.url.replace('/comments/', '') : '';

  form: FormInterface = this._form.getForm("comments", {
    formId: "comments",
    title: "Comments",
    components: [
      {
        name: "Text",
        key: "content",
        focused: true,
        fields: [
          {
            name: "Placeholder",
            value: "fill comments content",
          },
          {
            name: "Label",
            value: "Content",
          },
        ],
      },
    ],
  });

  config = {
    create: () => {
      this._form.modal<Articlecomment>(this.form, {
        label: "Create",
        click: (created: unknown, close: () => void) => {
          if (this.articleId) {
            (created as Articlecomment).article = this.articleId;
          }
          this._sa.create(created as Articlecomment);
          close();
        },
      });
    },
    update: (doc: Articlecomment) => {
      this._form
        .modal<Articlecomment>(this.form, [], doc)
        .then((updated: Articlecomment) => {
          this._core.copy(updated, doc);
          this._sa.update(doc);
        });
    },
    delete: (doc: Articlecomment) => {
      this._alert.question({
        text: this._translate.translate(
          "Common.Are you sure you want to delete this Articlecomment?"
        ),
        buttons: [
          {
            text: this._translate.translate("Common.No"),
          },
          {
            text: this._translate.translate("Common.Yes"),
            callback: () => {
              this._sa.delete(doc);
            },
          },
        ],
      });
    },
    buttons: [
      {
        icon: "cloud_download",
        click: (doc: Articlecomment) => {
          this._form.modalUnique<Articlecomment>("comments", "url", doc);
        },
      },
    ],
  };

  get rows(): Articlecomment[] {
    return this.articleId
    ?this._sa.commentsByArticleId[this.articleId] || []
    :this._sa.articlecomments;
  }

  constructor(
    private _translate: TranslateService,
    private _alert: AlertService,
    private _sa: ArticlecommentService,
    private _form: FormService,
    private _core: CoreService,
    private _router: Router
  ) {}
}
