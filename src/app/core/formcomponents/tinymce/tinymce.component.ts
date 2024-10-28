import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';

@Component({
  selector: 'app-tinymce',
  templateUrl: './tinymce.component.html',
  styleUrls: ['./tinymce.component.scss']
})
export class TinyMCEComponent implements OnInit {
  @ViewChild('templateRef', { static: true }) 
  templateRef: TemplateRef<any>;

  htmlContent = '';

  editorOptions = {
    inline: false,
    menubar: false,
    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright',
    plugins: 'link image',
  };

  constructor(private _form: FormService) {}

  ngOnInit(): void {
    this._form.addTemplateComponent<any>('TinyMCE', this.templateRef);
  }

  handleEditorChange(event: any) {
    this.htmlContent = event.editor.getContent();
  }
}