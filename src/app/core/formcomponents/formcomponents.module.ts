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
		NgxTinymceModule.forRoot({
			baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/'
		})
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
		this._form.injectComponent<BooleanComponent>(BooleanComponent, [
			'Label'
		]);

		this._form.injectComponent<ButtonComponent>(ButtonComponent, ['Label']);

		this._form.injectComponent<DateComponent>(DateComponent);

		this._form.injectComponent<EmailComponent>(EmailComponent);

		this._form.injectComponent<NumberComponent>(NumberComponent);

		this._form.injectComponent<PasswordComponent>(PasswordComponent);

		this._form.injectComponent<PhotoComponent>(
			PhotoComponent,
			['Label', 'Width', 'Height'],
			{
				Width: 'Number',
				Height: 'Number'
			}
		);

		this._form.injectComponent<PhotosComponent>(
			PhotosComponent,
			['Label', 'Width', 'Height'],
			{
				Width: 'Number',
				Height: 'Number'
			}
		);

		this._form.injectComponent<SelectComponent>(
			SelectComponent,
			['Placeholder', 'Label', 'Items', 'Multiple'],
			{
				Items: 'Tags',
				Multiple: 'Boolean'
			}
		);

		this._form.injectComponent<TagsComponent>(TagsComponent, [
			'Button',
			'Placeholder',
			'Label'
		]);

		this._form.injectComponent<TextComponent>(
			TextComponent,
			['Textarea', 'Placeholder', 'Label'],
			{ Textarea: 'Boolean' }
		);

		this._form.injectComponent<TimeComponent>(TimeComponent);

		this._form.injectComponent<TinyMCEComponent>(TinyMCEComponent);
	}
}
