// home/components/contact/contact.ts
import { ChangeDetectorRef, Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class Contact implements OnInit, OnChanges {
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
  ) { }

  ngOnInit() {
    if (this.userId) {
      this.loadUserData(this.userId);
      this.loadLocalisation(this.userId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].firstChange) {
      const newUserId = changes['userId'].currentValue;
      if (newUserId) {
        this.loadUserData(newUserId);
        this.loadLocalisation(newUserId);
      }
    }
  }

  // Chargement des données utilisateur (email, téléphone)
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

  // Chargement de la localisation de l'utilisateur
  private loadLocalisation(userId: number) {
    console.log('Chargement localisation pour userId:', userId);

    // Appel à l'API pour récupérer la localisation
    this.localisationService.getLocalisationByUserId(userId).subscribe({
      // En cas de succès, on met à jour la localisation
      next: (loc) => {
        this.localisation = loc || {
          pays: 'Côte d\'Ivoire',
          ville: 'Grand-Bassam',
          quartier: '',
          longitude: 0,
          latitude: 0
        };
        this.cdr.detectChanges(); // <- force Angular à rafraîchir le template
        console.log('Localisation chargée pour userId', userId, this.localisation);
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
        this.cdr.detectChanges();
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