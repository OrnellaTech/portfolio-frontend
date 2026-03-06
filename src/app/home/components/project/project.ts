import { Component, inject } from '@angular/core';
import { ProjetService } from '../../../shared/service/ProjetService';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project {

private projetService = inject(ProjetService)

}
