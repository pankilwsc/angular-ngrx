import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  filter, finalize, first, tap,
} from 'rxjs/operators';
import { areTodosLoaded } from '../../todos/todo.selectors';
import { loadAllTodos } from '../../todos/todo.actions';

@Injectable()
export class TodoResolver implements Resolve<boolean> {
  loading = false;
  
  constructor(private store: Store) {
  }

  resolve(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.store.dispatch(loadAllTodos());
      this.store.select(areTodosLoaded).subscribe({
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
