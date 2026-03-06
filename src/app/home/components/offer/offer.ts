// home/components/offer/offer.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { iOffer } from '../../../shared/models/IOffer';
import { OfferService } from '../../../shared/service/OfferService';  // ← Import OfferService

@Component({
  selector: 'app-offer',
  standalone: true,  
  imports: [CommonModule],
  templateUrl: './offer.html',
  styleUrl: './offer.scss',
})
export class Offer implements OnInit {
  @Input() userId!: number;
  
  // Données par défaut (fallback)
  private readonly DEFAULT_OFFER: iOffer = {
    intro: "I offer a range of services to help you achieve your goals.",
    item: [
      {
        nom: 'Web Development',
        detail: 'I create responsive and user-friendly websites using the latest technologies.'
      },
      {
        nom: 'Mobile App Development',
        detail: 'I develop cross-platform mobile applications that provide a seamless user experience.'
      },
      {
        nom: 'UI/UX Design',
        detail: 'I design intuitive and visually appealing interfaces to enhance user engagement.'
      },
      {
        nom: 'Presentation Design',
        detail: 'I create visually stunning presentations that effectively communicate your message.'
      }
    ]
  };

  offer: iOffer = { ...this.DEFAULT_OFFER };

  constructor(private offerService: OfferService) {}  // ← Utilise OfferService

  ngOnInit() {
    console.log('Offer - userId reçu:', this.userId);
    
    if (this.userId) {
      this.loadUserServices(this.userId);
    }
  }
private loadUserServices(userId: number) {
    this.offerService.getAllOfferByUserId(userId).subscribe({
        next: (services: any[]) => {  // ← ajoute : any[]
            console.log('Offer - services reçus de l\'API:', services);
            
            if (services && services.length > 0) {
                this.offer = {
                    intro: this.DEFAULT_OFFER.intro,
                    item: services.map((service: any) => ({  // ← ajoute : any
                        nom: service.nom,
                        detail: service.detail || 'Description non disponible'
                    }))
                };
            } else {
                this.offer = { ...this.DEFAULT_OFFER };
            }
        },
        error: (err: any) => {  // ← ajoute : any
            console.error('Offer - erreur:', err);
            this.offer = { ...this.DEFAULT_OFFER };
        }
    });
}
}