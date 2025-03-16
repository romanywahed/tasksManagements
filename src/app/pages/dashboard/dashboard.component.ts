import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  paginatedTasks: Task[] = [];
  selectedTask: Task = { id: 0, title: '', description: '', status: 'Pending', priority: 'Low', dueDate: '' };

  searchText: string = '';
  statusFilter: string = '';
  priorityFilter: string = '';
  sortColumn: string = '';

  page: number = 1;
  pageSize: number = 5;

  @ViewChild('taskModal') taskModal: any;

  constructor(private taskService: TaskService, private modalService: NgbModal) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }

  openTaskModal(task?: Task) {
    this.selectedTask = task ? { ...task } : { id: 0, title: '', description: '', status: 'Pending', priority: 'Low', dueDate: '' };
    this.modalService.open(this.taskModal, { centered: true });
  }

  saveTask() {
    if (this.selectedTask.id) {
      this.taskService.updateTask(this.selectedTask).subscribe(() => this.loadTasks());
    } else {
      this.taskService.addTask(this.selectedTask).subscribe(() => this.loadTasks());
    }
    this.modalService.dismissAll();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.filterTasks();
    });
  }

  markCompleted(task: Task) {
    task.status = 'COMPLETED';
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  filterTasks() {
    this.paginatedTasks = this.tasks
      .filter(task => task.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
        (!this.statusFilter || task.status === this.statusFilter) &&
        (!this.priorityFilter || task.priority === this.priorityFilter))
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  onPageChange() {
    this.filterTasks();
  }

  sortBy(column: keyof Task) {
    this.tasks.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    this.filterTasks();
  }
}
