import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InitializeService } from 'src/app/services/initialize/initialize.service';
import { LocalStorageValues } from 'src/app/services/localstorage/localstorage.service';
import { WidthService } from 'src/app/services/width/width.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public initializeService: InitializeService, private router: Router, public widthService: WidthService, public authService: AuthService) { }

  ngOnInit() { }

  logout() {
    localStorage.removeItem(LocalStorageValues.userId)
    this.router.navigate(['/auth'], { replaceUrl: true })
  }

}
