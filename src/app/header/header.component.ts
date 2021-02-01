import { Component, OnInit } from '@angular/core';
import {
  faAsterisk,
  faBan,
  faBell as faSolidBell,
  faCamera,
  faCircle,
  faCloud,
  faCog,
  faEnvelopeOpen,
  faHandPointLeft,
  faHome,
  faMobile,
  faMoon,
  faPlay,
  faSkating,
  faSkiing,
  faSkiingNordic,
  faSmileBeam as faSmileBeanSolid,
  faSmileWink as faSmileWinkSolid,
  faSnowboarding,
  faSpinner,
  faSquare,
  faStar,
  faSun,
  faSwimmer,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import {faBell as faRegularBell, faSmileBeam, faSmileWink} from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
// import {fas} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(library:FaIconLibrary, private tokenStorage:TokenStorageService, private router:Router) { 
    library.addIcons(faSmileWinkSolid, faSmileBeanSolid,
      faSmileWink, faSmileBeam, faEnvelopeOpen, faCloud,
      faMobile, faSquare, faSpinner, faCircle,
      faSync, faPlay, faSun, faMoon, faStar,
      faHandPointLeft, faAsterisk, faCog, faSkating,
      faSkiing, faSkiingNordic, faSnowboarding, faSwimmer,
      faSolidBell, faRegularBell, faCamera, faBan, faHome);
  }

  isLog = false;
  ngOnInit(): void {
  }
  onLogout(){
    this.tokenStorage.signOut();
    this.isLog = false;
    this.router.navigate(['/login']);

  }

}
