import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  filter, finalize, first, tap,
} from 'rxjs/operators';
import { areTodoLoaded } from '../../todos/todo.selectors';
import { loadAllTodos, loadTodo } from '../../todos/todo.actions';

@Injectable()
export class TodoEditResolver implements Resolve<boolean> {
  loading = false;
  constructor(
    private store: Store
  ) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const todoId = route.paramMap.get("id");
      this.store.dispatch(loadTodo({todoId}));
      this.store.select(areTodoLoaded).subscribe({
        next: state => {
          observer.next(true);
          observer.complete();
        },
        error: () => {
          observer.error(false);
        }
      });
    }).pipe(
      catchError(() => {
        return of(false);
      })
    );
  }
}
