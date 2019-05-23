import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})
export class SedeComponent implements OnInit {

  sede: any;
  nombre: string;
  departamento: string;
  municipio: string;
  zona: string;
  direccion: string;
  telefono: string;
  correo: string;
  horario: string;
  Status: string;
  grados: string;
  colegio;
    r;
  constructor(private db: AngularFireDatabase,
              private auth: AuthenticationService,
              private userService: UserService,
              public dialog: MatDialog) {
      this.auth.getStatus().subscribe(
          (user)=>{
              this.r = user;
              /*this.userService.getColegioo(this.r.uid).valueChanges().subscribe(
                  (colegio: any[])=>{
                      colegio.forEach(
                          (data)=>{
                              this.colegio = data;
                          }
                      );
                  }
              );*/
              this.userService.checkIdSchool().then(response => {
                  this.colegio = response;
              });
          }
      );
  }
  createSedes() {
    const dataSede = {
    Nombre:       this.nombre === undefined ? 'campo vacio!' : this.nombre,
      Departamento: this.departamento,
      Municipio:    this.municipio,
      Zona:         this.zona,
      Direccion:    this.direccion,
      Telefono:     this.telefono,
      Correo:       this.correo,
    Horario:      this.horario,
    Id_colegio: this.colegio,
Id : this.db.createPushId(),
    Id_representante:this.r.uid,
    Status:"1",
  Timestamp: Date.now()
    }
    this.userService.createSede(dataSede).then(
        (data) => {
          //  this.dialog.closeAll();
        }
    ).catch(
        error =>{
            console.log(`error al crear secciones ${error}`);
        }
    );
  }

  ngOnInit() {
  }
}
