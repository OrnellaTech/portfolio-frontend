import { Component, OnInit } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';
import { About } from '../../home/components/about/about'; // Ajoute ça
import { Portfolio } from '../../home/components/portfolio/portfolio'; // Ajoute ça

import { Contact } from '../../home/components/contact/contact'; // Ajoute ça (ou ContactForm selon ton nom)
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Ajoute CommonModule pour *ngIf etc.
import { Offer } from '../../home/components/offer/offer';
import { Introduction } from '../../home/components/introduction/introduction';

@Component({
  selector: 'app-user-page',
  standalone: true, // Ajoute standalone: true si ce n'est pas déjà fait
  imports: [
    CommonModule,    // Pour les directives comme *ngIf, *ngFor
    Header,
    Footer,
    Introduction,
    About,           // Maintenant importé !
    Portfolio,       // Maintenant importé !
    Offer,       // Maintenant importé !
    Contact,         // Maintenant importé !
  ],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
})
export class UserPage implements OnInit {
  userId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    console.log('UserPage - userId:', this.userId);
  }
}