import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {injectAttribute} from "@angular/core/src/render3";
import {Maestro} from "../../interfaces/maestro";
import {MAT_DIALOG_DATA} from "@angular/material";
import {Colegio} from "../../interfaces/colegio";
import {Alumno} from "../../interfaces/alumno";

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
    usuario;
    sub;

    constructor(private userService: UserService,
                private authService: AuthenticationService,
                @Inject(MAT_DIALOG_DATA) public data:any) {
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
        this.userService.getColegioo(this.colegio).valueChanges().subscribe(
            (colegio: any)=>{
                if (colegio.id) {
                    const nom = [this.alumno.nombre, this.data.apellido];
                    const nombre = nom.join(' ');
                    const solicitud = {
                        'id_user': this.alumno.id_alumno,
                        'id_t': this.usuario,
                        'nombre': nombre,
                        'id_colegio': colegio.id,
                        'id_representante': colegio.id_representante,
                        'role': this.data.role
                    }
                    this.userService.createSolicitud(solicitud).then(
                        (ss)=>{
                            
                        }
                    ).catch(
                        (err)=>{

                        }
                    );
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
