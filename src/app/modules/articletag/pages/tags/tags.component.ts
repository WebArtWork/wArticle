import { Component } from "@angular/core";
import { FormService } from "src/app/core/modules/form/form.service";
import { ArticletagService, Articletag } from "../../services/articletag.service";
import { AlertService, CoreService } from "wacom";
import { TranslateService } from "src/app/core/modules/translate/translate.service";
import { FormInterface } from "src/app/core/modules/form/interfaces/form.interface";

@Component({
	templateUrl: "./tags.component.html",
	styleUrls: ["./tags.component.scss"],
})
export class TagsComponent {
	columns = ["name", "description"];

	form: FormInterface = this._form.getForm("tags", {
		formId: "tags",
		title: "Tags",
		components: [
			{
				name: "Text",
				key: "name",
				focused: true,
				fields: [
					{
						name: "Placeholder",
						value: "fill tags title",
					},
					{
						name: "Label",
						value: "Title",
					},
				],
			},
			{
				name: "Text",
				key: "description",
				fields: [
					{
						name: "Placeholder",
						value: "fill tags description",
					},
					{
						name: "Label",
						value: "Description",
					},
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Articletag>(this.form, {
				label: "Create",
				click: (created: unknown, close: () => void) => {
					this._sa.create(created as Articletag);
					close();
				},
			});
		},
		update: (doc: Articletag) => {
			this._form
				.modal<Articletag>(this.form, [], doc)
				.then((updated: Articletag) => {
					this._core.copy(updated, doc);
					this._sa.update(doc);
				});
		},
		delete: (doc: Articletag) => {
			this._alert.question({
				text: this._translate.translate(
					"Common.Are you sure you want to delete this cservice?"
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
				click: (doc: Articletag) => {
					this._form.modalUnique<Articletag>("tags", "url", doc);
				},
			},
			{
				icon: 'article',
				hrefFunc: (doc: Articletag) => '/articles/' + doc._id
			},
		],
	};

	get rows(): Articletag[] {
		return this._sa.articletags;
	}

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _sa: ArticletagService,
		private _form: FormService,
		private _core: CoreService
	) { }
}
