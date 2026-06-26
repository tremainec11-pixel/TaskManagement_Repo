import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'https://localhost:7000/api/projects';


  constructor(
    private http: HttpClient
  ) {}


  createProject(project:any): Observable<Project>{

    return this.http.post<Project>(
      this.apiUrl,
      project
    );

  }


  getProjects():Observable<Project[]>{

    return this.http.get<Project[]>(
      this.apiUrl
    );

  }

}