import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Maestro} from "../../interfaces/maestro";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Grados} from "../../interfaces/grado";

@Component({
    selector: 'app-asignar-alumno-grado',
    templateUrl: './asignar-alumno-grado.component.html',
    styleUrls: ['./asignar-alumno-grado.component.scss']
})
export class AsignarAlumnoGradoComponent implements OnInit {

    grados;
    iddd;
    idm;
    asd;
    user;

    constructor(private uService: UserService, 
                private aService: AuthenticationService,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.aService.getStatus().subscribe(
            (user) => {
                this.user = user;
                this.uService.getGrado(user.uid).valueChanges().subscribe(
                    (grados) => {
                        this.grados = grados;
                    }
                );
            }
        );
    }

    ert(d) {
        console.log(JSON.stringify(d));
        this.iddd = d;
        const g = {
            'uid': this.user.uid,
            'grd': this.iddd
        };
        this.uService.getSGrado(g).valueChanges().subscribe(
            (data: Grados) => {
                console.log(data);
                this.asd = data.nombre;
            }
        );
    }

    AssignMG(dd) {
        if (dd != null) {
            const name = [this.data.nombre, this.data.apellido];
            const ll = name.join(' ');
            const asignacion = {
                'id_alumno': this.data.id_alumno,
                'id_grado': dd,
                'nombre': ll,
                'nombreGrado': this.asd,
                'tutor': this.data.id_tutor,
                'id_representante': this.user.uid
            }
            this.uService.asignAGrado(asignacion).then(
                (data) => {
                    const ids = {
                        'id': this.data.id_tutor,
                        'id_alumno': this.data.id_alumno,
                        'id_grado': dd
                    }
                    this.uService.updateGAlm(ids).then(
                        (success) => {
                            console.log('exito');
                        }
                    );
                }
            );
        }
    }

    ngOnInit() {
    }

}
