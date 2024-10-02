import { Component } from '@angular/core';
import { ArticleService, Article } from '../../services/article.service';
import { AlertService, CoreService } from 'wacom';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
	columns = ['name', 'description'];

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
			}
		]
	});

	config = {
		create: () => {
			this._form.modal<Article>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
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
			}
		]
	};

	get rows(): Article[] {
		return this._sa.articles;
	}

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _sa: ArticleService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
