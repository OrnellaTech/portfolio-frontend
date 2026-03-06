import { Component, HostListener  } from '@angular/core';
import { Header } from '../shared/components/header/header';
import { Footer } from '../shared/components/footer/footer';
import { About } from './components/about/about';
import { Blog } from './components/blog/blog';
import { Fact } from './components/fact/fact';
import { Introduction } from './components/introduction/introduction';
import { Portfolio } from './components/portfolio/portfolio';
import { Offer } from './components/offer/offer';
import { Testimonial } from './components/testimonial/testimonial';
import { Video } from './components/video/video';
import { Contact } from './components/contact/contact';
import { Preloader } from '../shared/components/preloader/preloader';
import { Project } from './components/project/project';
import { Resume } from './components/resume/resume';

@Component({
  selector: 'app-home',
  imports: [
   Header,
   Footer,
   About,
  //  Blog,
  //  Fact,
   Introduction,
   Portfolio,
   Offer,
  //  Testimonial,
  //  Video,
   Contact,
   Preloader,
  //  Project,
  //  Resume




  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const glow = document.querySelector('.cursor-glow') as HTMLElement;
    if (!glow) return;

    glow.style.left = event.clientX + 'px';
    glow.style.top = event.clientY + 'px';
  }

}
