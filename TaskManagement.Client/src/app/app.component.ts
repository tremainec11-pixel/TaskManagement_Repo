import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

 
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement
);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements AfterViewInit {

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

ngAfterViewInit(): void {

  
    new Chart('projectsMiniChart',{

type:'line',

data:{
labels:['','','','',''],

datasets:[{

data:[2,4,3,6,8],

borderColor:'#3b82f6',

backgroundColor:'transparent',

borderWidth:3,

pointRadius:0,

tension:.4,

fill:false

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{
legend:{display:false}
},

scales:{
x:{display:false},
y:{display:false}
}

}

});

new Chart('tasksMiniChart',{

type:'bar',

data:{
labels:['','','','',''],

datasets:[{

data:[5,7,4,8,6],

backgroundColor:'#22c55e',

borderRadius:8

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{
legend:{display:false}
},

scales:{
x:{display:false},
y:{display:false}
}

}

});

new Chart('completedMiniChart',{

type:'line',

data:{
labels:['','','','',''],

datasets:[{

data:[8,10,15,22,32],

borderColor:'#8b5cf6',

borderWidth:3,

pointRadius:0,

tension:.45

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{
legend:{display:false}
},

scales:{
x:{display:false},
y:{display:false}
}

}

});


new Chart('teamMiniChart',{

type:'bar',

data:{
labels:['','','',''],

datasets:[{

data:[3,6,7,8],

backgroundColor:'#f59e0b',

borderRadius:8

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{
legend:{display:false}
},

scales:{
x:{display:false},
y:{display:false}
}

}

});

new Chart('taskChart',{
  
    type:'bar',

    data:{

      labels:[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun'
      ],

      datasets:[{

        label:'Completed Tasks',

        data:[
          4,
          7,
          10,
          7,
          11,
          13
        ],

        backgroundColor:'#2563eb',

        borderRadius:8

      }]

    },

    options:{

      responsive:true,

      maintainAspectRatio:false,

      plugins:{
        legend:{
          display:false
        }
      }

    }

  });


}

}
