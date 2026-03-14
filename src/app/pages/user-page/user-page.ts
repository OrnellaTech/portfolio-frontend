import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { About } from '../../home/components/about/about'; 
import { Portfolio } from '../../home/components/portfolio/portfolio';

import { Contact } from '../../home/components/contact/contact'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // CommonModule pour *ngIf etc.
import { Offer } from '../../home/components/offer/offer';
import { Introduction } from '../../home/components/introduction/introduction';

@Component({
  selector: 'app-user-page',
  standalone: true, 
  imports: [
    CommonModule, 
    Header,
    Footer,
    Introduction,
    About,          
    Portfolio,      
    Offer,       
    Contact,        
  ],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage implements OnInit {
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  
  ) {}
  
  ngOnInit() {
     this.route.params.subscribe(params => {
      this.userId = +params['id'];
     });
  }


 onUserChanged(newUserId: number) {
    console.log('UserPage - événement onUserChanged:', newUserId);
    //  Mettre à jour l'URL pour refléter le changement d'utilisateur
    if (this.userId !== newUserId) {
      this.router.navigate(['/utilisateur', newUserId]);
    }
  }
}