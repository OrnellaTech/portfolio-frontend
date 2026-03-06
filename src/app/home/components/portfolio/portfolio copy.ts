import { Component } from '@angular/core';
import { iPortofolio, iProject } from '../../../shared/models/portfolio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio {

  selectedProject: iProject | null = null;
closeMedia() {
  this.selectedProject = null;
}

  portfolio : iPortofolio = {
    intro : "Here are some of the projects I worked on.",
    projects : [
      {
        title: 'Scoop 3B website',
        tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        description: 'Website developed for an Ivorian agricultural cooperative to present their activities, improve their online visibility and facilitate contact with potential partners.',
        imageUrl: 'assets/images/project1.png',
        projectUrl: 'https://forum-cooperative.vercel.app/',
        role: 'Fullstack Developer',
        category: 'Web App',
        githubUrl : 'https://github.com/OrnellaTech/',

      },
      {
        title: 'Ivoire Fashion',
        tools: ['HTML', 'CSS', 'Python', 'Django'],
        description: 'An e-commerce fashion website designed to showcase clothing collections and allow users to browse products, view details and simulate an online shopping experience.',
        imageUrl: 'assets/images/project2.png',
        role: 'Fullstack Developer',
        category: 'Web App',
         githubUrl : 'https://github.com/OrnellaTech/',
         mediaType: 'gallery',
          gallery: [
    'assets/images/project1.png',
    'assets/images/project2.png',
     'assets/images/project1.png',
    'assets/images/project2.png',
  ]
      },
      {
        title: 'Health Search',
        tools: ['Flutter', 'Dart'],
        description: 'A mobile application that helps users find nearby pharmacies and compare medicine prices in order to access healthcare products more easily.',
        imageUrl: 'assets/images/project3.jpeg',
        role: 'Frontend Developer',
        category: 'Mobile App',
        note:'Source code unavailable. Demo video available.',
        mediaType: 'video', 
        mediaUrl: 'assets/video/demo-health.mp4',
      },
    ]
  };
}
