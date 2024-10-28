import {
	AfterViewInit,
	Component,
	OnInit,
	TemplateRef,
	ViewChild
} from '@angular/core';
import { FormService } from '../../modules/form/form.service';
interface Interface {}
@Component({
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements AfterViewInit, OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;
	constructor(private _form: FormService) {}
	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Tags', this.templateRef);
	}
	// @ViewChild('inputRef', { static: false }) inputRef: any;

	// tags: string[] = [];
	addTag(data: any, inputRef:any) {
		data.submition[data.key] = data.submition[data.key] || [];
	  
		data.submition[data.key].push(
		  inputRef.value.replace('\n', '')
		);
	  
		inputRef.value = '';
	  
		this.update();
	  
		setTimeout(() => {
		  inputRef.focus();
		}, 100);
	}

	ngAfterViewInit() {
		// this.tags = this.value || this.tags;
	}

	update() {
		// this.control.setValue(this.tags);
	}
}
