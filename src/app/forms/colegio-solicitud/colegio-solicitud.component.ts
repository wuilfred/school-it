import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {injectAttribute} from "@angular/core/src/render3";
import {Maestro} from "../../interfaces/maestro";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Colegio} from "../../interfaces/colegio";
import {Alumno} from "../../interfaces/alumno";
//import { AlumnosListComponent } from '../../alumnos-list/alumnos-list.component'
import {MatDialog} from "@angular/material";

import {AuthenticationService} from "../../services/authentication.service";

@Component({
    selector: 'app-colegio-solicitud',
    templateUrl: './colegio-solicitud.component.html',
    styleUrls: ['./colegio-solicitud.component.scss']
})
export class ColegioSolicitudComponent implements OnInit {

    school;
    alumno;
    colegio;
    colegio2
    usuario;
    sub;

    constructor(private userService: UserService,
                private authService: AuthenticationService,
                @Inject(MAT_DIALOG_DATA) public data:any,
                private dialog: MatDialog) {
        this.authService.getStatus().subscribe(
            (user)=>{
                this.usuario = user.uid;
            }
        );
        this.sub = this.userService.getSchoolList().valueChanges().subscribe(
            (colegios)=>{
                this.school = colegios;
                this.alumno = data;
            }
        );
    }

    enviarSolicitud(){
        this.userService.getColegioInfo(this.colegio).valueChanges().subscribe(
            (colegio)=>{
                this.colegio2 = colegio;
                if (this.colegio2.Id) {
                    const nom = [this.alumno.Nombre, this.data.Apellidos];
                    const nombre = nom.join(' ');
                    const solicitud = {
                        'Id_alumno': this.alumno.Id,
                        'Id_representante_alumno': this.usuario,
                        'Nombre_usuario': nombre,
                        'Id_colegio': this.colegio2.Id,
                        'Nombre_colegio': this.colegio2.Nombre_comercial,
                        'Id_representante': this.colegio2.Id_representante,
                        'Tipo_usuario': "alumno",
                          'Status': "1",
                    }
                  console.log(solicitud);
                } else {
                    alert('Selecciona un colegio');
                }
            }
        );

    }

    close(){
        this.data.dialog.closeAll();
    }

    ngOnInit() {
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

}
