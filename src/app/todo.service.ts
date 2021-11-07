import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Todo } from './to-do';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private ToDosUrl = 'api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.ToDosUrl)
    .pipe(
      tap(_ => this.log('fetched todos')),
      catchError(this.handleError<Todo[]>('getTodos', []))
    );
  }

  addToDo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.ToDosUrl, todo, this.httpOptions).pipe(
      tap((newTodo: Todo) => this.log(`added toDo w/ id=${newTodo.id}`)),
      catchError(this.handleError<Todo>('addToDo'))
    );
  }

  deleteToDo(id: Number): Observable<Todo> {
    const url = `${this.ToDosUrl}/${id}`;

    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted toDo id=${id}`)),
      catchError(this.handleError<Todo>('deleteToDo'))
    );

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    console.log(message);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
