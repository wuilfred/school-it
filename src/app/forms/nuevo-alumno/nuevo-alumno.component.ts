import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-nuevo-alumno',
    templateUrl: './nuevo-alumno.component.html',
    styleUrls: ['./nuevo-alumno.component.scss']
})
export class NuevoAlumnoComponent implements OnInit {

    t;
    userrr;
    nombreT;
    tel;
    sub;

    nombre: string;
    apellido: string;
    edad: number;
    seguro?: string;
    sangre: string;
    telefonoSeguro: string;
    alergia: string;
    correo?: string;
    nota: string;

    constructor(private db: AngularFireDatabase, 
                private auth: AuthenticationService, 
                private userService: UserService,
                public dialog: MatDialog) {
        this.auth.getStatus().subscribe(
            (user)=>{
                this.userrr = user.uid;
                this.userService.getTutor(user.uid).valueChanges().subscribe(
                    (tutor: any)=>{
                        this.t = tutor;
                        this.tel = tutor.telefono;
                        const nom = [tutor.nombre, tutor.apellido];
                        this.nombreT = nom.join(' ');
                    }
                );
            }
        );
    }

    crearAlumno(){
        const alm = {

            'nombret': this.nombreT,
            // 'contacto_alm': this.tel,

            'role': 'alumno',

            'id_alumno': this.db.createPushId(),
            'id_tutor': this.userrr,
            'nombre': this.nombre,
            'apellido': this.apellido,
            'edad': this.edad,
            'seguro': this.seguro,
            'numero_seguro': this.telefonoSeguro,
            'tipo_sangre': this.sangre,
            'correo' : this.correo,
            'nota': this.nota,
            'alergia': this.alergia
        }
        this.userService.createAlumno(alm).then(
            (alumno)=>{
                console.log('creado');
                this.dialog.closeAll();
            }
        );
    }
    close(){
        this.dialog.closeAll();
    }
    ngOnInit() {
    }

}
