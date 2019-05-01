import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import { DiarioComponent } from '../forms/diario/diario.component';
import {MatDialog} from '@angular/material';
import { rS } from '@angular/core/src/render3';

@Component({
  selector: 'app-diarios',
  templateUrl: './diarios.component.html',
  styleUrls: ['./diarios.component.scss']
})
export class DiariosComponent implements OnInit {

  title: String = 'Diario';
  user;
  diarios;
  rs: any[];
  col;
  grd;
  DataDiario;
  info = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private userService: UserService) {

    const idinstitucion = localStorage.getItem('idinstitucion');
    this.authService.getStatus().subscribe(
      (user) => {
          this.userService.getDiarios(idinstitucion).valueChanges().subscribe(
            (diario) => {
              this.info = diario;
              diario.forEach(
                (data, key) => {
                  this.DataDiario = Object.keys(this.info[key]).map(function(key2) {
                    return diario[key][key2];
                   });
                   this.diarios = this.DataDiario;
                }
              );
            }
          );
      }
    );

  }

  ngOnInit() {
    console.log(this.rs);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DiarioComponent, {
        panelClass: ['modal-color1'],
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
    });
  }
}
