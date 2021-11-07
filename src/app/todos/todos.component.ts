import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './../to-do';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styles: [`
  .kb-cell {
      font-weight: 700;
      color: #FF5252;
      text-decoration: line-through;
  }
`]
})
export class TodosComponent implements OnInit {

  todo = <Todo>{};

  todos: Todo[] = [];

  constructor(private toDoService: TodoService) {}

  ngOnInit(): void {
    this.toDoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  add(todo: Todo): void {
    todo.name = todo.name.trim();
    if (!todo.name) { return; }
    this.toDoService.addToDo(todo)
      .subscribe(todo => {
        this.todos.push(todo);
      });
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.toDoService.deleteToDo(todo.id).subscribe();
  }
}
