import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { allTodoLoaded, createTodo, deleteTodo, loadAllTodos, loadTodo, todoCreated, todoDeleted, todoFailer, todoLoaded, todoUpdated, updateTodo } from "./todo.actions";
import { TodoService } from "../shared/services/todo.service";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { Todo, TodoTypeEnum } from "../shared/model/todo.model";
import { of } from "rxjs";

@Injectable()
export class TodosEffects {
  constructor(
    private actions$: Actions,
    private invoicesService: TodoService,
  ) {
  }

  loadAllTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllTodos),
      mergeMap(action =>
        this.invoicesService.getAllTodos().pipe(
          map(todos => allTodoLoaded({ todos })),
          catchError(error => of(todoFailer({ errorType: 'List', error: error })))
        )
      )
    ));

  createTodo$ = createEffect(() => 
    this.actions$
    .pipe(
      ofType(createTodo),
      mergeMap(action =>
        this.invoicesService.createTodo(action.todo).pipe(
          map(todos => allTodoLoaded({ todos })),
          catchError(error => of(todoFailer({ errorType: 'Add', error: error })))
        )
      )
    ));


  updateTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(updateTodo),
      mergeMap((action: any) =>
        this.invoicesService.updateTodos(action.todo.id, action.todo).pipe(
          map(todos => todoLoaded({ todo: todos })),
          catchError(error => of(todoFailer({ errorType: 'update', error: error })))
        )
      )
    ), { dispatch: true });

  deleteTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(deleteTodo),
      mergeMap((action: any) =>
        this.invoicesService.deleteTodo(action.id).pipe(
          map(todos => todoDeleted({ todo: todos })),
          catchError(error => of(todoFailer({ errorType: 'delete', error: error })))
        )
      )
    ));

  loadTodo$ = createEffect(() => this.actions$
    .pipe(
      ofType(loadTodo),
      mergeMap((action: any) =>
        this.invoicesService.getTodo(action.todoId).pipe(
          map((todo: Todo) => todoLoaded({ todo })),
          catchError(error => of(todoFailer({ errorType: 'list', error: error })))
        )
      )
    ));
}

