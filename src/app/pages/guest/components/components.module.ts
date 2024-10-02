import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsComponent } from './components.component';
import { Routes, RouterModule } from '@angular/router';
import { FileModule } from 'src/app/core/modules/file/file.module';

const routes: Routes = [
	{
		path: '',
		component: ComponentsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, FileModule],
	declarations: [ComponentsComponent],
	providers: []
})
export class ComponentsModule {}
