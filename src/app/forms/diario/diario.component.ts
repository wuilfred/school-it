import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {MatDialog} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { SolicitudesComponent } from 'src/app/solicitudes/solicitudes.component';


export interface DataGrado {
  Descripcion: string;
  Id_colegio: string;
  Id_representantes: string;
  Id_maestro: string;
  Nombre: string;
}

export interface DataMaestro {
  Nombre: string;
  Apellido: string;
  uid: string;
  Correo: string;
  Departamento: string;
}

export interface DataMateria {
  Nombre: string;
  Descripcion: string;
  Id_colegio: string;
  Id_representante: string;
  Id_usuario: string;
  Nota: string;
  Status: false;
  Requisitos: string;
}

export interface DataSeccion {
  Nombre: string;
  Descripcion: string;
  Id_colegio: string;
  Id_representante: string;
  Id_usuario: string;
  Nota: string;
  Status: string;
}

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.scss']
})
export class DiarioComponent implements OnInit {

  user;
  DataColegio;
  DataGrado;
  DataMaestro;
  DataMateria;
  DataRepresentante;
  DataSeccion;
  DataSede;
  DataAsigMaestro;
  gradosList: string[] =  [];
  dgrados;
  //
  contenido: String;
  Fecha = new Date();
  Grado: String;
  Id_colegio: String;
  Id_grado: String;
  Id_maestro: String;
  Id_materia: String;
  Id_representante: String;
  Id_seccion: String;
  Id_sede: String;
  Id_usuario: String;
  isVisible: boolean;
  maestro: String;
  materia: String;
  seccion: String;
  Sede: String;
  Status: 1;
  Timestamp: String;
  titulo: String;
  dataDiario: object;
  info = [];
  infoMa = [];

  gradoControl = new FormControl('', [Validators.required]);
  maestroControl = new FormControl('', [Validators.required]);
  materiaControl = new FormControl('', [Validators.required]);
  seccionControl = new FormControl('', [Validators.required]);
  sedeControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthenticationService, private userService: UserService,
    private db: AngularFireDatabase,
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DiarioComponent, {
        panelClass: ['modal-color1'],
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
    });
  }

  ngOnInit() {
    this.authService.getStatus().subscribe(

      (user) => {
          this.user = user;
          this.userService.getColegioo(this.user.uid).valueChanges().subscribe(
              (colegio: any[]) => {
                  colegio.forEach(
                      (data) => {
                          this.DataColegio = data;
                      }
                  );
              }
          );

          this.userService.getGrado(this.user.uid).valueChanges().subscribe(
            (grado: any[]) => {
              grado.forEach(
                (data) => {
                  this.DataGrado = [data];
                }
              );
            }
          );

        const getIdColegio = localStorage.getItem('idinstitucion');

        this.userService.getMaestrosA(getIdColegio).valueChanges().subscribe(
          (asigMaestroColegio) => {
            this.info = asigMaestroColegio;
            this.info.forEach(
              (data, key2) => {
                this.DataAsigMaestro = Object.keys(this.info[key2]).map(function(key) {
                 return asigMaestroColegio[key2][key];
                });
                this.DataAsigMaestro.forEach(
                  (rs) => {
                    this.userService.getMaterias(rs.Id_colegio).valueChanges().subscribe(
                      (materia) => {
                        this.DataMateria = materia;
                      }
                    );

                    this.userService.getMaestro(rs.Id_maestro).valueChanges().subscribe(
                      (maestro) => {
                        this.DataMaestro = [maestro];
                      }
                    );


                    this.userService.getSection(rs.Id_colegio).valueChanges().subscribe(
                      (seccione) => {
                        console.log(seccione);
                        this.DataSeccion = seccione;
                      }
                    );

                    this.userService.getSede(rs.Id_colegio).valueChanges().subscribe(
                      (sede) => {
                        this.DataSede = sede;
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  createDiario()  {
    this.dataDiario = {
      'Content':        this.contenido,
      'Fecha':          this.Fecha,
      'Grado':          this.gradoControl.value.descripcion,
      'Id_colegio':     this.sedeControl.value.Id_colegio,
      'Id_grado':       this.gradoControl.value.id,
      'Id_maestro':     this.maestroControl.value.Id_maestro,
      'Id_materia':     this.materiaControl.value.Id_colegio,
      'Id_representante': this.sedeControl.value.Id_representante,
      'Id_seccion':     this.seccionControl.value.Id,
      'Id_sede':        this.sedeControl.value.Id_colegio,
      'Id_usuario':     this.materiaControl.value.Id_usuario,
      'isVisible':      this.maestroControl.value.IsVisible,
      'Maestro':        this.maestroControl.value.Nombre,
      'Materia':        this.materiaControl.value.Nombre,
      'Seccion':        this.seccionControl.value.Nombre,
      'Sede':           this.sedeControl.value.Nombre,
      'Status':         this.sedeControl.value.Status,
      'Timestamp':      this.sedeControl.value.Timestamp,
      'Titulo':         this.titulo
    };


    console.log(this.dataDiario);
  }

}
