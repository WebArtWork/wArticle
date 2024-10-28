import { ButtonModule } from 'src/app/core/modules/button/button.module';
import { InputModule } from 'src/app/core/modules/input/input.module';
import { FileModule } from 'src/app/core/modules/file/file.module';
import { FormService } from 'src/app/core/modules/form/form.service';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
/* componnets */
import { EmailComponent } from './email/email.component';
import { NumberComponent } from './number/number.component';
import { TimeComponent } from './time/time.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotosComponent } from './photos/photos.component';
import { DateComponent } from './date/date.component';
import { TextComponent } from './text/text.component';
import { ButtonComponent } from './button/button.component';
import { PasswordComponent } from './password/password.component';
import { SelectComponent } from './select/select.component';
import { BooleanComponent } from './boolean/boolean.component';
import { TagsComponent } from './tags/tags.component';
import { TinyMCEComponent } from './tinymce/tinymce.component';
import { NgxTinymceModule } from 'ngx-tinymce';

@NgModule({
	imports: [
		InputModule,
		ButtonModule,
		CommonModule,
		FileModule,
		SelectModule,
		FormsModule,
		NgxTinymceModule
	],
	declarations: [
		/* declarations */
		EmailComponent,
		NumberComponent,
		TimeComponent,
		DateComponent,
		PhotoComponent,
		PhotosComponent,
		PasswordComponent,
		SelectComponent,
		TextComponent,
		ButtonComponent,
		BooleanComponent,
		TagsComponent,
		TinyMCEComponent
	]
})
export class FormcomponentsModule {
	constructor(private _form: FormService) {
		/* addComponents */
		this._form.injectComponent<BooleanComponent>("Boolean", BooleanComponent, [
			'Label'
		]);

		this._form.injectComponent<ButtonComponent>("Button", ButtonComponent, ['Label']);

		this._form.injectComponent<DateComponent>("Date", DateComponent);

		this._form.injectComponent<EmailComponent>("Email", EmailComponent);

		this._form.injectComponent<NumberComponent>("Number", NumberComponent);

		this._form.injectComponent<PasswordComponent>("Password", PasswordComponent);

		this._form.injectComponent<PhotoComponent>(
			"Photo",
			PhotoComponent,
			['Label', 'Width', 'Height'],
			{
				Width: 'Number',
				Height: 'Number'
			}
		);

		this._form.injectComponent<PhotosComponent>(
			"Photos",
			PhotosComponent,
			['Label', 'Width', 'Height'],
			{
				Width: 'Number',
				Height: 'Number'
			}
		);

		this._form.injectComponent<SelectComponent>(
			"Select",
			SelectComponent,
			['Placeholder', 'Label', 'Items', 'Multiple'],
			{
				Items: 'Tags',
				Multiple: 'Boolean'
			}
		);

		this._form.injectComponent<TagsComponent>("Tags", TagsComponent, [
			'Button',
			'Placeholder',
			'Label'
		]);

		this._form.injectComponent<TextComponent>(
			"Text",
			TextComponent,
			['Textarea', 'Placeholder', 'Label'],
			{ Textarea: 'Boolean' }
		);

		this._form.injectComponent<TimeComponent>("Time", TimeComponent);

		this._form.injectComponent<TinyMCEComponent>("TinyMCE", TinyMCEComponent);
	}
}
