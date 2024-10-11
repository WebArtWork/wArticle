import { Component } from '@angular/core';
import { ArticleService, Article } from '../../services/article.service';
import { AlertService, CoreService } from 'wacom';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TagsComponent } from 'src/app/core/formcomponents/tags/tags.component';
import { ArticletagService } from 'src/app/modules/articletag/services/articletag.service';
import { Router } from "@angular/router";

@Component({
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
	columns = ['name', 'description'];

	tagId = this._router.url.includes('/articles/') ? this._router.url.replace('/articles/', '') : '';

	form: FormInterface = this._form.getForm('articles', {
		formId: 'articles',
		title: 'Articles',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill articles title'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill articles description'
					},
					{
						name: 'Label',
						value: 'Description'
					}
				]
			},
			{
				name: 'Select',
				key: 'tags',
				fields: [
					{
						name: 'Items',
						value: this._ats.articletags
					},
					{
						name: 'Placeholder',
						value: 'Select tags'
					},
					{
						name: 'Label',
						value: 'Tags'
					},
					{
						name: 'Multiple',
						value: true
					}
				]
			}
		]
	});
	
	config = {
		create: () => {
			this._form.modal<Article>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.tagId) {
						(created as Article).articletag = this.tagId;
					}
					this._sa.create(created as Article);
					close();
				}
			});
		},
		update: (doc: Article) => {
			this._form
				.modal<Article>(this.form, [], doc)
				.then((updated: Article) => {
					this._core.copy(updated, doc);
					this._sa.update(doc);
				});
		},
		delete: (doc: Article) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cservice?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._sa.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Article) => {
					this._form.modalUnique<Article>('articles', 'url', doc);
				}
			},
			{
				icon: 'comment',
				ahrefFunc: (doc: Article) => '/comments/' + doc._id
			}
		]
	};

	get rows(): Article[] {
		return this.tagId
		?this._sa.articlesByTagId[this.tagId] || []
		:this._sa.articles;
	}

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _sa: ArticleService,
		private _ats: ArticletagService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
