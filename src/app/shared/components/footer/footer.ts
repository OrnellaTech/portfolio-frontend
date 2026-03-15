// shared/components/footer/footer.ts
import { Component, Input, OnInit } from '@angular/core';
import { iFooter } from '../../models/footer';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/UserService';  // Importe UserService, pas SocialLinkService

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer implements OnInit {
  @Input() userId!: number;
  currentYear: number = new Date().getFullYear();
  private readonly DEFAULT_FOOTER: iFooter = {
    copyright_author: "OrnellaTech",
    icons: [
      { url: 'https://www.linkedin.com/in/ornella-marie-h%C3%A9l%C3%A8ne-moyh%C3%A9-koffi-113035338/', icon: 'fab fa-linkedin-in' },
      { url: 'https://github.com/OrnellaTech/', icon: 'fab fa-github' }
    ]
  };

  footer: iFooter = { ...this.DEFAULT_FOOTER };

  constructor(private userService: UserService) { }  // Utilise UserService

  ngOnInit() {
    if (this.userId) {
      this.loadUserSocialLinks(this.userId);
    }
  }

  private loadUserSocialLinks(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        console.log('Footer - utilisateur reçu:', user);

        // Uniquement les réseaux sociaux
        if (user.sociallinks && user.sociallinks.length > 0) {
          this.footer.icons = user.sociallinks.map(link => ({
            url: link.lien,
            icon: this.getIconFromPlatform(link.nom)
          }));
        }
      },
      error: (err) => {
        console.error('Erreur chargement réseaux sociaux:', err);
        // Garder les icônes par défaut
      }
    });
  }

  private getIconFromPlatform(platform: string): string {
    const icons: { [key: string]: string } = {
      'linkedin': 'fab fa-linkedin-in',
      'linkdln': 'fab fa-linkedin-in',
      'github': 'fab fa-github',
      'twitter': 'fab fa-twitter',
      // ... autres
    };
    return icons[platform?.toLowerCase()] || 'fab fa-link';
  }
}