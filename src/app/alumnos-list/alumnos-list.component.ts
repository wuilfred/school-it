import {Component, OnInit} from '@angular/core';
import {GradoFormComponent} from "../forms/grado-form/grado-form.component";
import {MatDialog} from "@angular/material";
import {NuevoAlumnoComponent} from "../forms/nuevo-alumno/nuevo-alumno.component";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {ColegioSolicitudComponent} from "../forms/colegio-solicitud/colegio-solicitud.component";

@Component({
    selector: 'app-alumnos-list',
    templateUrl: './alumnos-list.component.html',
    styleUrls: ['./alumnos-list.component.scss']
})
export class AlumnosListComponent implements OnInit {

    title: string = 'Alumnos';
    userr;
    alumnos;

    constructor(private dialog: MatDialog, private auth: AuthenticationService, private userService: UserService) {
        this.auth.getStatus().subscribe(
            (user) => {
                this.userService.getAlumnos(user.uid).valueChanges().subscribe(
                    (alumnos) => {
                        this.alumnos = alumnos;
                    }
                );
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NuevoAlumnoComponent, {
            panelClass: ['modal-color1'],
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    asignarColegio(alumno): void {
        const dialogRef = this.dialog.open(ColegioSolicitudComponent, {
            panelClass: ['modal-color1'],
            data: alumno
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    ngOnInit() {
    }

}
