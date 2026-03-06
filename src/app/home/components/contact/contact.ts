// home/components/contact/contact.ts
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';  // Pour les formulaires
import { PriseContactService } from '../../../shared/service/PriseContactService';
import { LocalisationService } from '../../../shared/service/LocalisationService';
import { UserService } from '../../../shared/service/UserService';
import { iPriseContact } from '../../../shared/models/IPriseContact';
import { iLocalisation } from '../../../shared/models/ILocalisation';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  @Input() userId!: number;
  
  // Données de l'utilisateur
  userEmail: string = '';
  userPhone: string = '';
  localisation: iLocalisation | null = null;
  
  // Données du formulaire
  contactData: iPriseContact = {
    nom_complet: '',
    email: '',
    objet: '',
    message: ''
  };
  
  // État du formulaire
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;
  submitError: string | null = null;

  constructor(
    private userService: UserService,
    private localisationService: LocalisationService,
    private priseContactService: PriseContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.userId) {
      this.loadUserData(this.userId);
      this.loadLocalisation(this.userId);
    }
  }

  private loadUserData(userId: number) {
    console.log('📧 Chargement données utilisateur pour userId:', userId);
    
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        console.log('✅ Utilisateur chargé:', user);
        this.userEmail = user.email || '';
        this.userPhone = user.telephone || '';
        
        // Force la mise à jour de l'affichage
        this.cdr.detectChanges();
        
        console.log('📧 Email mis à jour:', this.userEmail);
        console.log('📞 Téléphone mis à jour:', this.userPhone);
      },
      error: (err) => {
        console.error('❌ Erreur chargement utilisateur:', err);
      }
    });
  }

  private loadLocalisation(userId: number) {
    console.log('Chargement localisation pour userId:', userId);
    
    this.localisationService.getLocalisationByUserId(userId).subscribe({
        next: (loc) => {
            console.log('✅ Localisation reçue et traitée:', loc);
            this.localisation = loc;
        },
        error: (err) => {
            console.error('❌ Erreur chargement localisation:', err);
            // Données par défaut
            this.localisation = {
                pays: 'Côte d\'Ivoire',
                ville: 'Grand-Bassam',
                quartier: '',
                longitude: 0,
                latitude: 0
            };
        }
    });
}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = null;

    this.priseContactService.savePriseContact(this.userId, this.contactData).subscribe({
      next: (response) => {
        console.log('Message envoyé avec succès:', response);
        this.isSubmitting = false;
        this.submitSuccess = true;
        
        // Réinitialiser le formulaire
        form.resetForm();
        this.contactData = {
          nom_complet: '',
          email: '',
          objet: '',
          message: ''
        };
        
        // Cacher le message de succès après 5 secondes
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: (err) => {
        console.error('Erreur envoi message:', err);
        this.isSubmitting = false;
        this.submitError = "Une erreur est survenue. Veuillez réessayer.";
        
        // Cacher l'erreur après 5 secondes
        setTimeout(() => {
          this.submitError = null;
        }, 5000);
      }
    });
  }
}