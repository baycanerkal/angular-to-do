import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './to-do';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const todos = [
      {id:1, name: 'First item', done: true},
      {id:2, name: 'Second item', done: false},
      {id:3, name: 'Third item', done: false}
    ];
    return {todos};
    
  }
  
  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  }

}
