import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { articleFormComponents } from '../../formcomponents/article.formcomponents';
import { Router } from '@angular/router';
import { ArticletagService } from 'src/app/modules/articletag/services/articletag.service';

@Component({
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss'],
	standalone: false
})
export class ArticlesComponent {
	columns = ['title'];

	tag = this._router.url.includes('/articles/') ? this._router.url.replace('/articles/', '') : '';

	form: FormInterface = this._form.getForm('article', articleFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Article>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Article);

					this._articleService.create(created as Article);

					close();
				}
			}, this.tag ? {tags: [this.tag]} : {});
		},
		update: (doc: Article): void => {
			this._form.modal<Article>(this.form, [], doc).then((updated: Article) => {
				this._core.copy(updated, doc);

				this._articleService.update(doc);
			});
		},
		delete: (doc: Article): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this article?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._articleService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Article): void => {
					this._form.modalUnique<Article>('article', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		]
	};

	get rows(): Article[] {
		return this.tag ? this._articleService.articlesByTag[this.tag] : this._articleService.articles;
	}

	constructor(
		private _translate: TranslateService,
		private _articleService: ArticleService,
		private _ats: ArticletagService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		if (this.form.components[7].fields?.length) {
			this.form.components[7].fields[0].value = this._ats.articletags;
		}
	}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Article>(create ? [] : this.rows)
				.then((articles: Article[]) => {
					if (create) {
						for (const article of articles) {
							this._preCreate(article);

							this._articleService.create(article);
						}
					} else {
						for (const article of this.rows) {
							if (!articles.find(
								localArticle => localArticle._id === article._id
							)) {
								this._articleService.delete(article);
							}
						}

						for (const article of articles) {
							const localArticle = this.rows.find(
								localArticle => localArticle._id === article._id
							);

							if (localArticle) {
								this._core.copy(article, localArticle);

								this._articleService.update(localArticle);
							} else {
								this._preCreate(article);

								this._articleService.create(article);
							}
						}
					}
				});
		};
	}

	private _preCreate(article: Article): void {
		article.__created;

		if (this.tag && !article.tags?.length) {
			article.tags = [this.tag];
		}
	}
}
