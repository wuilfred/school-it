import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {Grados} from "../interfaces/grado";
import {Alumno} from "../interfaces/alumno";
import {AsignacionAlumno} from "../interfaces/asignacionAlumno";
import {AuthenticationService} from "../services/authentication.service";
import {Maestro} from "../interfaces/maestro";
import {Colegio} from "../interfaces/colegio";
import {Tarea} from "../interfaces/tarea";

@Component({
    selector: 'app-gradosdetail',
    templateUrl: './gradosdetail.component.html',
    styleUrls: ['./gradosdetail.component.scss']
})
export class GradosdetailComponent implements OnInit {

    grd;
    grado;
    master;
    asignacion: AsignacionAlumno[];
    asd;
    maestro: Maestro[];
    title: string = 'Grado';
    alumnos;
    as;
    tareas: Tarea[];

    constructor(public activatedRoute: ActivatedRoute,
                public userService: UserService,
                public authService: AuthenticationService) {
        this.grd = this.activatedRoute.snapshot.params['grd'];
        this.authService.getStatus().subscribe(
            (user)=>{
                const g = {
                    'uid': user.uid,
                    'grd': this.grd
                }
                const idD = {
                    'grado': this.grd,
                    'colegio' : user.uid
                }
                console.log(g);
                this.userService.getTareas(idD).valueChanges().subscribe(
                    (tarea: Tarea[])=>{
                        console.log(tarea);
                        this.tareas = tarea;
                    },
                    err=>{
                        console.log(err);
                    }
                );
                this.userService.getMastersG(g).valueChanges().subscribe(
                    (masters) => {
                        console.log(masters);
                        this.master = masters;
                    }
                );
                this.userService.getAlumnosG(g).valueChanges().subscribe(
                    (alumnos) => {
                        console.log(alumnos);
                        this.alumnos = alumnos;
                    }
                );
            }
        );
    }

    ngOnInit() {
    }

    ngOnDestroy() {

    }

}
