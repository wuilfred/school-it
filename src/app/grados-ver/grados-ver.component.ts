import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {Maestro} from "../interfaces/maestro";
import {GradoFormComponent} from "../forms/grado-form/grado-form.component";
import {MatDialog} from "@angular/material";
import {NuevaTareaComponent} from "../forms/nueva-tarea/nueva-tarea.component";
import {NuevoDiarioComponent} from "../forms/nuevo-diario/nuevo-diario.component";

@Component({
    selector: 'app-grados-ver',
    templateUrl: './grados-ver.component.html',
    styleUrls: ['./grados-ver.component.scss']
})
export class GradosVerComponent implements OnInit {

    grd;
    sub;
    uid;
    colegio;
    tareas;
    diarios;
    alumnos;
    master: Maestro[];

    constructor(private aroute: ActivatedRoute, private userService: UserService,
                private authService: AuthenticationService, private dialog: MatDialog) {
        this.grd = aroute.snapshot.params['grd'];
        this.uid = aroute.snapshot.params['uid'];
        const route = {
            'grd' : this.grd,
            'uid' : this.uid
        };
        const idD = {
            'colegio': this.uid,
            'grado': this.grd
        }
        this.userService.getSGrado(route).valueChanges().subscribe(
            (data)=>{
                console.log(data);
                /*this.userService.getMastersG(route).valueChanges().subscribe(
                    (masters: Maestro[]) => {
                        console.log(masters);
                        this.master = masters;
                    }
                );*/
                this.userService.getTareas(idD).valueChanges().subscribe(
                    (tarea: any[])=>{
                        this.tareas = tarea.reverse();
                }
                );
                this.userService.getColegioo(this.uid).valueChanges().subscribe(
                    (colegio)=>{
                        this.colegio = colegio;
                    }
                );
                this.userService.getDiario(idD).valueChanges().subscribe(
                    (diario)=>{
                        this.diarios = diario.reverse();
                    }
                );
                this.userService.getAlumnosG(route).valueChanges().subscribe(
                    (alumnos) => {
                        console.log(alumnos);
                        this.alumnos = alumnos;
                    }
                );
            }
        );
    }

    openDialog(): void {
        const data = {
            'uid': this.uid,
            'grd': this.grd
        }
        const dialogRef = this.dialog.open(NuevaTareaComponent, {
            panelClass: ['modal-color1', 'modal-border'],
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }
    openDialogT(): void {
        const data = {
            'uid': this.uid,
            'grd': this.grd
        }
        const dialogRef = this.dialog.open(NuevoDiarioComponent, {
            panelClass: ['modal-color1'],
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(){
    }

}
