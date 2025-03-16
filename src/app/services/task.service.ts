import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../pages/models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/v1/tasks'; 

  constructor(private http: HttpClient) {}

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

 
  deleteTask(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
  getTasks(status?: string, priority?: string, dueDate?: string, sortBy: string = 'dueDate'): Observable<Task[]> {
    let params = new HttpParams();
  
    if (status) params = params.set('status', status);
    if (priority) params = params.set('priority', priority);
    if (dueDate) params = params.set('dueDate', dueDate);
  
    // params = params.set('sortBy', sortBy);
  
    return this.http.get<Task[]>(`${this.apiUrl}`, { params });
  }
  
}
