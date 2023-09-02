import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Todo } from '@todo-demo/data';

@Component({
	selector: 'ui-todo-footer',
	templateUrl: './todo-footer.component.html',
	styleUrls: ['./todo-footer.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent {
	@Input() todos: Todo[] = [];
}
