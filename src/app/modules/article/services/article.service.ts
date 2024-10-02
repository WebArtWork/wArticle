import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument
} from 'wacom';

export interface Article extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root'
})
export class ArticleService extends CrudService<Article> {
	articles: Article[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'article'
			},
			_http,
			_store,
			_alert,
			_core
		);
		this.get().subscribe((articles: Article[]) =>
			this.articles.push(...articles)
		);
		_core.on('article_create').subscribe((article: Article) => {
			this.articles.push(article);
		});
		_core.on('article_delete').subscribe((article: Article) => {
			this.articles.splice(
				this.articles.findIndex((o) => o._id === article._id),
				1
			);
		});
	}
}
