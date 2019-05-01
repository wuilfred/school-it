import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import { ColegioComponent } from '../forms/colegio/colegio.component';
import {MatDialog} from '@angular/material';
import { rS } from '@angular/core/src/render3';

@Component({
  selector: 'app-colegios',
  templateUrl: './colegios.component.html',
  styleUrls: ['./colegios.component.scss']
})
export class ColegiosComponent implements OnInit {

  title: String = 'Colegio';
  user;
  colegio;
  rs: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private userService: UserService) {
    const idinstitucion = localStorage.getItem('idinstitucion');
    this.authService.getStatus().subscribe(
      (user) => {
        this.userService.getSede(idinstitucion).valueChanges().subscribe(
          (colegio: any[]) => {
            console.log(colegio);
            this.colegio = colegio;
          }
        );
      }
    );

  }

  ngOnInit() {
    console.log(this.rs);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ColegioComponent, {
        panelClass: ['modal-color1'],
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
    });
  }
}
