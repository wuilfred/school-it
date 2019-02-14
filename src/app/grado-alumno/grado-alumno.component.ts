import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-grado-alumno',
    templateUrl: './grado-alumno.component.html',
    styleUrls: ['./grado-alumno.component.scss']
})
export class GradoAlumnoComponent implements OnInit {

    title: string = 'Grado';
    col;
    grd;
    colegio;
    tareas;
    master;
    alumnos;
    diarios;

    constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
        this.col = this.activatedRoute.snapshot.params['col'];
        this.grd = this.activatedRoute.snapshot.params['grd'];
        const route = {
            'grd' : this.grd,
            'uid' : this.col
        };
        const idD = {
            'colegio': this.col,
            'grado': this.grd
        }
        this.userService.getSGrado(route).valueChanges().subscribe(
            (data)=>{
                console.log(data);
                this.userService.getMastersG(route).valueChanges().subscribe(
                    (masters: any[]) => {
                        console.log(masters);
                        this.master = masters;
                    }
                );
                this.userService.getAlumnosG(route).valueChanges().subscribe(
                    (alumnos: any[]) => {
                        console.log(alumnos);
                        this.alumnos = alumnos;
                    }
                );
                this.userService.getTareas(idD).valueChanges().subscribe(
                    (tarea: any[])=>{
                        this.tareas = tarea.reverse();
                    }
                );
                this.userService.getColegioo(this.col).valueChanges().subscribe(
                    (colegio)=>{
                        this.colegio = colegio;
                    }
                );
                this.userService.getDiario(idD).valueChanges().subscribe(
                    (diario)=>{
                        this.diarios = diario.reverse();
                    }
                );
            }
        );
    }

    ngOnInit() {
    }

}
