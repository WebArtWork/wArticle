import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument
} from 'wacom';

export interface Articletag extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root'
})
export class ArticletagService extends CrudService<Articletag> {
	articletags: Articletag[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'articletag'
			},
			_http,
			_store,
			_alert,
			_core
		);
		this.get().subscribe((articletags: Articletag[]) =>
			this.articletags.push(...articletags)
		);
		_core.on('articletag_create').subscribe((articletag: Articletag) => {
			this.articletags.push(articletag);
		});
		_core.on('articletag_delete').subscribe((articletag: Articletag) => {
			this.articletags.splice(
				this.articletags.findIndex((o) => o._id === articletag._id),
				1
			);
		});
	}
}
