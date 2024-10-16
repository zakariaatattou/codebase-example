import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoadingBarComponent } from './shared/components/loading-bar/loading-bar.component';
import { LoadingBarService } from './shared/components/loading-bar/loading-bar.service';
import { CommonModule } from '@angular/common';
import { HttpHandlerService } from './core/services/http-handler.service';
import { apiRoutes } from './core/constants/routes';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, ToastModule, LoadingBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent implements OnInit {

  constructor(private _translate: TranslateService,
    public loadingBarService: LoadingBarService,
    private _userService: UserService,
    private _authService: AuthService,
    private _http: HttpHandlerService) {
    this._translate.addLangs(['en']);
    this._translate.setDefaultLang('en');
    this._translate.use('en');
  }
  title = 'grow-wise';

  ngOnInit(): void {
    this._translate.setDefaultLang('en');
    this._translate.use('en');

    if (this._userService.isAuthenticated()) {
      this._authService.getProfile().subscribe(res => {
        this._userService.setUser({ ...this._userService.getCurrentUserData(), ...res.data })
      })
    }
  }
}
