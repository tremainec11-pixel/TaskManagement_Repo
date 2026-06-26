import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';


@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {


  @Output() close = new EventEmitter<void>();


  project = {

    name:'',
    description:'',
    status:'Active'

  };


  constructor(
    private projectService: ProjectService
  ){}



  save(){


    this.projectService
    .createProject(this.project)
    .subscribe({

      next:()=>{

        alert("Project created 🚀");

        this.close.emit();

      },


      error:err=>{

        console.log(err);

      }


    });


  }


}