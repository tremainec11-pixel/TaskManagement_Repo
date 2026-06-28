import { Sidebar } from './components/sidebar/sidebar';
import { HeaderComponent } from './components/header/header';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
  FormsModule,
  Sidebar,
  HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  testMethod(project: any) {

  console.log(project);

}


  showProjectModal = false;

  showTaskModal = false;

  showEditProjectModal = false;

  showEditTaskModal = false;

  editingProject: any = null;

  editingTask: any = null;


  newProjectName = '';

  newTaskName = '';


  newProjectDescription = '';

  newTaskDescription = '';


  projects: any[] = [];

  tasks: any[] = [];

  constructor(){

  const savedProjects = localStorage.getItem('projects');

  const savedTasks = localStorage.getItem('tasks');


  if(savedProjects){
    this.projects = JSON.parse(savedProjects);

  }


  if(savedTasks){

    this.tasks = JSON.parse(savedTasks);

  }

}

  openTaskModal() {

    this.showTaskModal = true;

  }


  closeTaskModal() {

    this.showTaskModal = false;

  }



  openProjectModal() {

    this.showProjectModal = true;

  }



  closeProjectModal() {

    this.showProjectModal = false;

  }



  saveProject() {

  this.projects.push({

    id: Date.now(),

    name: this.newProjectName,

    description: this.newProjectDescription,

    status: 'Active'

  });


  console.log("PROJECTS SAVED:", this.projects);


  localStorage.setItem(
    'projects',
    JSON.stringify(this.projects)
  );

  console.log(
    "LOCAL STORAGE:",
    localStorage.getItem('projects')
  );


  this.newProjectName = '';
  this.newProjectDescription = '';

  this.closeProjectModal();

}


  deleteProject(id:number){


 this.projects =
 this.projects.filter(
 project => project.id !== id
 );


 localStorage.setItem(
   'projects',
   JSON.stringify(this.projects)
 );

}



  editProject(project:any){

  const newName =
    prompt(
      'Edit project name',
      project.name
    );

  if(newName){

    project.name = newName;

    localStorage.setItem(
      'projects',
      JSON.stringify(this.projects)
    );

  }

}



  saveTask() {

  this.tasks.push({

    id: Date.now(),

    title: this.newTaskName,

    description: this.newTaskDescription,

    status: 'Pending'

  });

  localStorage.setItem(
    'tasks',
    JSON.stringify(this.tasks)
  );

  this.newTaskName = '';
  this.newTaskDescription = '';

  this.closeTaskModal();

}



  deleteTask(id:number){


    this.tasks =
    this.tasks.filter(
      task => task.id !== id
    );


  }



  editTask(task:any){

  const newTitle =
    prompt(
      'Edit task',
      task.title
    );

  if(newTitle){

    task.title = newTitle;

    localStorage.setItem(
      'tasks',
      JSON.stringify(this.tasks)
    );

  }

}

openEditProjectModal(project: any) {

  this.editingProject = { ...project };

  this.showEditProjectModal = true;

}

closeEditProjectModal() {

  this.showEditProjectModal = false;

}

saveEditedProject() {

  const index = this.projects.findIndex(
    p => p.id === this.editingProject.id
  );

  if (index !== -1) {

    this.projects[index] = this.editingProject;

    localStorage.setItem(
      'projects',
      JSON.stringify(this.projects)
    );

  }

  this.closeEditProjectModal();

}



}