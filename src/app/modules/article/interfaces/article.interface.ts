import { CrudDocument } from 'wacom';

export interface Article extends CrudDocument {
	name: string;
	description: string;
}
