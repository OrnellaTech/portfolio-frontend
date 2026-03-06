// shared/components/header/header.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/UserService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  @Input() userId!: number;
  
  // Pour l'affichage du logo
  firstName: string = 'Ornella';    // Valeur par défaut
  lastName: string = 'Tech';         // Valeur par défaut

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.userId) {
      this.loadUserData(this.userId);
      
    }
  }

  private loadUserData(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        console.log('Header - utilisateur reçu:', user);
        
        // Mettre à jour avec le prénom et nom de l'utilisateur
        this.firstName = user.prenom || 'Ornella';
        this.lastName = user.nom || 'Tech';
      },
      error: (err) => {
        console.error('Header - erreur chargement utilisateur:', err);
        // Garder les valeurs par défaut
      }
    });
  }
}