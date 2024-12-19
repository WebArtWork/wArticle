import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class ArticleService extends CrudService<Article> {
	articles: Article[] = this.getDocs();

	articlesByTag: Record<string, Article[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'article',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.articlesByTag, 'tags');
	}
}
