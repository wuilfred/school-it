import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import { SedeComponent } from '../forms/sede/sede.component';
import {MatDialog} from '@angular/material';
import { rS } from '@angular/core/src/render3';


@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.scss']
})
export class SedesComponent implements OnInit {

  idt;
  uid;
  title: String = 'Sede';
  user;

  corre: string;
  departamento: string;
  direccion: string;
  horario: string;
  municipio: string;
  nombre: string;
  status: string;
  telefono: string;
  zona: string;
  dataSede ;
  rs: any[];
  sede;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    const idinstitucion = localStorage.getItem('idinstitucion');
    this.authService.getStatus().subscribe(
      (user) => {
        this.userService.getSede(idinstitucion).valueChanges().subscribe(
          (sede: any[]) => {
            console.log(sede);
            this.sede = sede;
          }
        );
      }
    );
  }

  ngOnInit() {
   console.log(this.rs);
  }


  openDialog(user): void {
        const dialogRef = this.dialog.open(SedeComponent, {
            panelClass: ['modal-color1']
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });

  }
}
