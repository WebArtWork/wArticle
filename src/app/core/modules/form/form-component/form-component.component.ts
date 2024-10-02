import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef
} from '@angular/core';
import { FormComponentInterface } from '../interfaces/component.interface';
import { FormInterface } from '../interfaces/form.interface';
import { FormService } from '../form.service';

@Component({
	selector: 'form-component',
	templateUrl: './form-component.component.html',
	styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {
	@Input() index: string;

	@Input() config: FormInterface;

	@Input() component: FormComponentInterface;

	@Input() submition: Record<string, unknown> = {};

	@Output() wSubmit = new EventEmitter();

	@Output() wChange = new EventEmitter();

	@Output() wClick = new EventEmitter();

	submit(): void {
		this.wSubmit.emit(this.submition);
	}

	change(): void {
		this.wChange.emit(this.submition);
	}

	click(): void {
		this.wClick.emit(this.submition);
	}

	get hasComponents(): boolean {
		return Array.isArray(this.component.components);
	}

	get template(): TemplateRef<unknown> {
		return this._form.getTemplateComponent(
			this.component.name as string
		) as TemplateRef<unknown>;
	}

	field: Record<string, unknown> = {};

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		if (Array.isArray(this.component.fields)) {
			for (const field of this.component.fields) {
				this.field[field.name] = field.value;
			}
		}
	}
}
