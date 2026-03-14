// shared/components/header/header.ts
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/UserService';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  @Input() userId!: number;
  @Output() userChanged = new EventEmitter<number>();

  // Pour l'affichage du logo
  firstName: string = 'Ornella';    // Valeur par défaut
  lastName: string = 'Tech';         // Valeur par défaut

  //Liste de tous les utilisateurs
  users: any[] = [];

  dropdownOpen: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit() {
    this.loadAllUsers();

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
    
      }
    });
  }

  private loadAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        console.log('Header - tous les utilisateurs reçus:', users);
        this.users = users;
      },
      error: (err) => {
        console.error('Header - erreur chargement de tous les utilisateurs:', err);

        this.users = [
          { id: 0, prenom: 'Nothing ', nom: 'to see' }
        ];
      }
    });


  }

  switchUser(userId: number) {
    console.log('Header - switchUser appelé avec userId:', userId);
    if (userId === 0) {
    this.router.navigate(['/']); // ← Redirige vers la page d'accueil
    this.firstName = 'Ornella';
    this.lastName = 'Tech';
  } else {
    this.router.navigate(['/utilisateur', userId]);
    this.loadUserData(userId);
  }
  
  this.dropdownOpen = false;
}


   toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}