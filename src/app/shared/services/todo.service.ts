import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Todo } from "../model/todo.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  API_URL =  environment.API_URL;

  constructor(private readonly http: HttpClient) {
  }

  getAllTodos() : Observable<Todo[]>  {
    return this.http.get<Todo[]>(`${this.API_URL}/todos`).pipe(
      map((response : any) => {
        return response.todos;
      })
    )
  }

  createTodo(data : Todo) : Observable<any> {
    let options = {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    };
    return this.http.post<Todo>(`${this.API_URL}/todos`,data,options)
  }

  updateTodos(id:any,data:Todo) : Observable<any>{
    let options = {
      headers: new HttpHeaders({ 'Accept': 'application/json' })
    };
    return this.http.put<Todo>(`${this.API_URL}/todos/${id}`,data,options)
  }

  deleteTodo(id : number) : Observable<Todo>  {
    return this.http.delete<any>(`${this.API_URL}/todos/${id}`);
  }

  getTodo(id : number) : Observable<Todo>  {
    return this.http.get<Todo[]>(`${this.API_URL}/todos/${id}`).pipe(
      map((response : any) => {
        return response.todo;
      })
    )
  }

}
