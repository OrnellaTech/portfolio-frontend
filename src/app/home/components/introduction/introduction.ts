// home/components/introduction/introduction.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iIntroduction } from '../../../shared/models/introduction';
import { UserService } from '../../../shared/service/UserService';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction implements OnInit {
  @Input() userId!: number;
  
  // Données par défaut (fallback)
  private readonly DEFAULT_INTRODUCTION: iIntroduction = {
    firstName: 'Ornella',
    lastName: 'Koffi',
    fullName: 'Koffi Ornella Marie-Hélène M.',
    titles: [
      'Future Software Engineer',
      'Computer Science Student',
      'Web and Mobile Developer'
    ],
    photo_Intro: 'assets/images/person.png'
  };

  introduction: iIntroduction = { ...this.DEFAULT_INTRODUCTION };

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log('Introduction - userId reçu:', this.userId);
    
    if (this.userId) {
      this.loadUserData(this.userId);
    }
  }

  private loadUserData(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        console.log('Introduction - utilisateur reçu:', user);
        // Traiter les titres
        let titles = this.DEFAULT_INTRODUCTION.titles;
        if (user.titles) {
          // Si titles est déjà un tableau
          titles = user.titles;
        } else if (user.titles_text) {
          // Si c'est un texte avec des virgules
          titles = user.titles_text.split(',').map(t => t.trim());
        }
        console.log('User titles:', user.titles);
console.log('User titles_text:', user.titles_text);
console.log('Titles after processing:', titles);
        // Construire le fullName à partir de prenom et nom
        const fullName = `${user.prenom} ${user.nom}`;
        
        // Mettre à jour l'introduction
        this.introduction = {
          firstName: user.prenom || this.DEFAULT_INTRODUCTION.firstName,
          lastName: user.nom || this.DEFAULT_INTRODUCTION.lastName,
          fullName: fullName,
          titles: titles, // Tu pourrais aussi avoir des titres dans l'utilisateur
          photo_Intro: user.photo_intro  || this.DEFAULT_INTRODUCTION.photo_Intro
        };

        
        console.log('Introduction - après mise à jour:', this.introduction);
      
      
      },
      error: (err) => {
        console.error('Introduction - erreur chargement utilisateur:', err);
        // Garder les données par défaut
      }
    });
  }
}