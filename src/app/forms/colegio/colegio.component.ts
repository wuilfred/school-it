import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {MatDialog} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-colegio',
  templateUrl: './colegio.component.html',
  styleUrls: ['./colegio.component.scss']
})
export class ColegioComponent implements OnInit {

  Nombre: string;
  Nombre_comercial: string;
  Municipio: string;
  Departamento: string;
  Zona: string;
  Direccion_central: string;
  Horario_central: string;
  Id_representante: string;
  Telefono: number;
  Mision: string;
  Vision: string;
  Web: string;
  Correo: string;
  Url_foto: string;
  Status: boolean;
  Timestamp: Timestamp<string>;
  dataColegio = Object();


  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private db: AngularFireDatabase,
    public dialog: MatDialog
  ) {}


  ngOnInit() {


  }

  insrtColegio() {
    const getIdRepresentante = localStorage.getItem('idinstitucion');
    this.dataColegio = {
      'Nombre':           this.Nombre,
      'Nombre_comercial': this.Nombre_comercial,
      'Municipio':        this.Municipio,
      'Departamento':     this.Departamento,
      'Zona':             this.Zona,
      'Direccion_central': this.Direccion_central,
      'Horario_central':  this.Horario_central,
      'Id_representante': getIdRepresentante,
      'Telefono':         this.Telefono,
      'Mision':           this.Mision,
      'Vision':           this.Vision,
      'Web':              this.Web,
      'Correo':           this.Correo,
      'Url_foto':         this.Url_foto,
      'Status':           this.Status,
      'Timestamp':        this.Timestamp
    };
    console.log(this.dataColegio);
  }

}
