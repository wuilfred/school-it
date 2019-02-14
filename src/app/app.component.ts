import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'schoolit';
  institucion = 0;
  constructor(public router: Router, public authService: AuthenticationService){
    this.authService.getStatus().subscribe(
        (user)=>{
            if(user != null){
                this.router.navigate(['inicio']);
            }
        }
    );
  }
}
