// home/components/portfolio/portfolio.ts
import { Component, Input, OnInit } from '@angular/core';
import { iPortofolio, iProject } from '../../../shared/models/portfolio';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/service/UserService'; // Vérifie le chemin

@Component({
  selector: 'app-portfolio',
  standalone: true,  // IMPORTANT : Ajoute standalone: true
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class Portfolio implements OnInit {
  @Input() userId!: number;  // Reçoit l'ID du parent
  
  selectedProject: iProject | null = null;
  
  // Données par défaut
  private readonly DEFAULT_PORTFOLIO: iPortofolio = {
    intro: "Here are some of the projects I worked on.",
    projects: [
      {
        title: 'Scoop 3B website',
        tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        description: 'Website developed for an Ivorian agricultural cooperative to present their activities, improve their online visibility and facilitate contact with potential partners.',
        imageUrl: 'assets/images/project1.png',
        projectUrl: 'https://forum-cooperative.vercel.app/',
        role: 'Fullstack Developer',
        category: 'Web App',
        githubUrl: 'https://github.com/OrnellaTech/',
      },
      {
        title: 'Ivoire Fashion',
        tools: ['HTML', 'CSS', 'Python', 'Django'],
        description: 'An e-commerce fashion website designed to showcase clothing collections and allow users to browse products, view details and simulate an online shopping experience.',
        imageUrl: 'assets/images/project2.png',
        role: 'Fullstack Developer',
        category: 'Web App',
        githubUrl: 'https://github.com/OrnellaTech/',
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
        note: 'Source code unavailable. Demo video available.',
        mediaType: 'video',
        mediaUrl: 'assets/video/demo-health.mp4',
      },
    ]
  };

  // Portfolio affiché
  portfolio: iPortofolio = { ...this.DEFAULT_PORTFOLIO };

  constructor(private userService: UserService) {
    console.log('Portfolio constructor - userService:', this.userService);
  }

  ngOnInit() {
    console.log('Portfolio - userId reçu:', this.userId);
    
    if (this.userId) {
      this.loadUserProjects(this.userId);
    } else {
      console.log('Portfolio - pas de userId, utilisation des données par défaut');
    }
  }

  private loadUserProjects(userId: number) {
    console.log('Portfolio - chargement des projets pour userId:', userId);
    
    this.userService.getUserProjects(userId).subscribe({
      next: (apiProjects: any[]) => {
         console.log('Portfolio - projets reçus de l\'API:', JSON.stringify(apiProjects, null, 2));
        if (apiProjects && apiProjects.length > 0) {
          // Transformer les projets API en format iProject
          this.portfolio = {
            intro: this.DEFAULT_PORTFOLIO.intro,
            projects: apiProjects.map(projet => ({
              title: projet.titre,
              description: projet.resume,
              imageUrl: projet.image || 'assets/images/default-project.jpg',
              projectUrl: projet.lien || undefined,
              role: projet.role || undefined,
              category: projet.category || undefined,
              githubUrl: projet.github_url || undefined,
              mediaType: projet.media_type || undefined,
              mediaUrl: projet.media_url || undefined,
              gallery: projet.gallery,
              tools: projet.tools?.map((tool: any) => tool.nom) || [],
            }))
          };
          console.log('Portfolio - après mapping:', this.portfolio);
        } else {
          console.log('Portfolio - aucun projet trouvé, utilisation des données par défaut');
        }
      },
      error: (err) => {
        console.error('Portfolio - erreur chargement:', err);
        // Garder les données par défaut
      }
    });
  }

  closeMedia() {
    this.selectedProject = null;
  }
}