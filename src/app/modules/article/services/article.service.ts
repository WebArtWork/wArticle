import { inject, Injectable } from '@angular/core';
import { HelperService } from "src/app/core/services/helper.service";
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument
} from 'wacom';

export interface Article extends CrudDocument {
	title: string;
	description: string;
	shortDescription: string;
	published: Date;
	tags: string;
}

@Injectable({
	providedIn: 'root'
})
export class ArticleService extends CrudService<Article> {
	_helper = inject(HelperService)

	articles: Article[] = [];

	articlesByTagId: Record<string, Article[]> = {}
	setarticlesByTagId = this._helper.createParentIdToChildrenIds<Article[]>(this.articlesByTagId, this.articles, 'tags')

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

		this.get().subscribe((articles: Article[]) => {
			this.articles.push(...articles)

			this.setarticlesByTagId()
		});

		_core.on('article_create').subscribe((article: Article) => {
			this.articles.push(article);

			this.setarticlesByTagId()
		});

		_core.on('article_delete').subscribe((article: Article) => {
			this.articles.splice(
				this.articles.findIndex((o) => o._id === article._id),
				1
			);

			this.setarticlesByTagId()
		});
	}
}
