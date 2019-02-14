import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {User} from '../interfaces/user';
import {take} from 'rxjs/internal/operators';
import {AngularFireDatabase} from '@angular/fire/database';
import {InicioComponent} from '../inicio/inicio.component';
import {Role} from '../interfaces/role';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: User[];
  usser;
  grd;

  constructor(private Route: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private db: AngularFireDatabase) {

      this.authenticationService.getStatus().subscribe((user) => {
        console.log('User id no set', user);
          this.userService.getURole(user.uid).valueChanges().subscribe(
              (role: Role) => {
                  if (role.Tipo === 'colegio') {
                      this.userService.getUsersById(user.uid).valueChanges().subscribe(
                          (user: User[]) => {
                              this.user = user;
                          }
                      );
                  } else if (role.Tipo === 'maestro') {
                      this.userService.getMm(user.uid).valueChanges().subscribe(
                          (user: User[]) => {
                              this.user = user;
                          }
                      );
                  } else {
                      this.userService.getTutor(user.uid).valueChanges().subscribe(
                          (user: User[]) => {
                              this.user = user;
                          }
                      );
                  }
              }
          );
      });
  }

    ngOnInit() {
    }
  getUser() {
      return JSON.parse(localStorage.getItem('owner')).email;
  }
  logout() {
      this.authenticationService.logout().then(() => {
          alert('Sesión Cerrada');
          this.router.navigate(['login']);
      }).catch(
          (error) => {
            console.log(error);
          }
      );
  }
}
