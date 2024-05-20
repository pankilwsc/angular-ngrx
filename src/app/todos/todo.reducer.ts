import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on, State } from '@ngrx/store';
import { Todo } from '../shared/model/todo.model';
import { allTodoLoaded, createTodo, deleteTodo, loadTodo, todoCreated, todoDeleted, todoFailer, todoLoaded, todoUpdated, updateTodo } from './todo.actions';

export const todosFeatureKey = 'todos';

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialTodosState = adapter.getInitialState(
  {
      areTodosLoaded : false,
      areTodoLoaded : false,
      selectedTodo : null,
      todos: []
  }
);

export interface Todostate extends EntityState<Todo> {
  areTodosLoaded: boolean;
  areTodoLoaded : boolean;
  selectedTodo : Todo | null;
  todos : Todo[] | null
}

export const reducer = createReducer(
  initialTodosState,
  on(allTodoLoaded, (state, action) => {
    adapter.removeAll(state);
    return adapter.setAll(action.todos, {
      ...state,
      areTodosLoaded: true,
    });
  }),
  on(todoCreated, (state, { todo }) => {
    return adapter.addOne(todo, state);
  }),
  on(todoUpdated, (state, { update }) => {
    return adapter.updateOne(update, state);
  }),
  on(todoDeleted, (state, action) =>{
     const currentList = Object.values(state.entities) as Todo[];
     const newList : Todo[] = currentList.filter((ct) => ct.id != action.todo.id);
     return adapter.setAll(newList, {
       ...state,
       areTodosLoaded: true,
       selectedTodo : null
     });
  }),
  on(todoLoaded, (state, action) => {
    return Object.assign({}, state, { selectedTodo: action.todo,areTodoLoaded: true});
  }),
);

export const {
  selectAll,
  selectEntities,
} = adapter.getSelectors();

export const getSelectedTodo = (state:any) => state.selectedTodo;

export function todoReducer(state: any, action: any) {
  return reducer(state, action);
}
