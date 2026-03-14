// home/components/introduction/introduction.ts
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iIntroduction } from '../../../shared/models/introduction';
import { UserService } from '../../../shared/service/UserService';

declare var Typed: any; // Déclare la variable pour l'animation de texte


@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
})
export class Introduction implements OnInit , OnChanges {
  @Input() userId!: number;

  typeInstance: any; // Pour stocker l'instance de Typed
  
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


 ngOnChanges(changes: SimpleChanges) {
    if (changes['userId'] && !changes['userId'].firstChange) {
        this.loadUserData(changes['userId'].currentValue);
    }
  }

  private initTyped(titles: string[]){
    if (this.typeInstance) {
      this.typeInstance.destroy(); // Détruit l'instance précédente si elle existe
    }
    
    if (!titles || titles.length === 0) return;

    this.typeInstance = new Typed('.welcome-text-type', {
      strings: titles,
      typeSpeed: 90,
      backDelay: 2000,
      backSpeed: 40,
      loop: true
    });
  }



  private loadUserData(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        console.log('Introduction - utilisateur reçu:', user);
        // Traiter les titres
        // let titles = this.DEFAULT_INTRODUCTION.titles;
        // if (user.titles) {
        //   // Si titles est déjà un tableau
        //   titles = user.titles;
        // } else if (user.titles_text) {
        //   // Si c'est un texte avec des virgules
        //   titles = user.titles_text.split(',').map(t => t.trim());
        // }
        const titles = user.titles
          ? user.titles
          : user.titles_text
          ? user.titles_text.split(',').map(t => t.trim())
          : this.DEFAULT_INTRODUCTION.titles;

          console.log('User titles:', user.titles);
          console.log('User titles_text:', user.titles_text);
          console.log('Titles after processing:', titles);
        // Construire le fullName à partir de prenom et nom
        
        
        // Mettre à jour l'introduction
        this.introduction = {
          firstName: user.prenom || this.DEFAULT_INTRODUCTION.firstName,
          lastName: user.nom || this.DEFAULT_INTRODUCTION.lastName,
          fullName: `${user.prenom} ${user.nom}`,
          titles:  titles,
          photo_Intro: user.photo_intro  || this.DEFAULT_INTRODUCTION.photo_Intro
        };

        
        console.log('Introduction - après mise à jour:', this.introduction);
      setTimeout(() => 
        this.initTyped(this.introduction.titles),0);
      
      },
      error: (err) => {
        console.error('Introduction - erreur chargement utilisateur:', err);
        setTimeout(() => this.initTyped(this.introduction.titles), 0);
      }
    });
  }
}