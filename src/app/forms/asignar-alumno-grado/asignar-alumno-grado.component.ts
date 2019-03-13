import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import {Maestro} from "../../interfaces/maestro";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Grados} from "../../interfaces/grado";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
    selector: 'app-asignar-alumno-grado',
    templateUrl: './asignar-alumno-grado.component.html',
    styleUrls: ['./asignar-alumno-grado.component.scss']
})
export class AsignarAlumnoGradoComponent implements OnInit {

    grados;
    iddd;
    idm;
    asd: String = '';
    user;
    colegio_id;

    constructor(private uService: UserService, 
                private aService: AuthenticationService,
                private db: AngularFireDatabase,
                private dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.aService.getStatus().subscribe(
            (user) => {
                this.user = user;
                 this.uService.checkIdSchool().then(response => {
                    this.colegio_id = response;
                    this.uService.getGrado(response).valueChanges().subscribe(
                        (grados) => {
                            this.grados = grados;
                        }
                    );
                });
            }
        );
    }

    ert(d) {
        console.log(JSON.stringify(d));
        this.iddd = d;
        const g = {
            'uid': this.colegio_id,
            'grd': this.iddd
        };
        this.uService.getSGrado(g).valueChanges().subscribe(
            (data: Grados) => {
                console.log(data);
                this.asd = data.Nombre;
            }
        );
    }

    AssignMG(dd) {
        if (dd != null) {
            this.uService.checkIdSchool().then(response => {
            const name = [this.data.Nombre, this.data.Apellido];
            const ll = name.join(' ');
            console.log('Alumno data this is:', this.data);
            const asignacion = {
                'id_alumno': this.data.Id_representante_alumno,
                'Id_grado': dd,
                'Nombre': ll,
                'nombreGrado': this.asd,
                'tutor': this.data.Id_representante_alumno,
                'id_representante': this.user.uid,
                'Id_colegio': response,
                'Status_solicitud': 'aceptado',
                'Status': '1',
                'Id_solicitud': this.db.createPushId()
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
                            alert('Asignado!');
                            this.data.dialog.closeAll();
                        }
                    );
                }
            );
            });
        }
    }

    ngOnInit() {
    }

}
