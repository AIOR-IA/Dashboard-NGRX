import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private authService = inject( AuthService );
  private router      = inject( Router );
  constructor() { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout()
      .then( () => this.router.navigateByUrl('/login'));

  }
}
