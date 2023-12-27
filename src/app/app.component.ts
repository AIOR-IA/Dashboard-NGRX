import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dashboardApp';
  private authService = inject( AuthService );

  ngOnInit(): void {
    this.authService.initAuthListener();
  }

}
