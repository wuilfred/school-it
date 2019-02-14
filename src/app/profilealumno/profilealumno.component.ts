import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {Alumno} from "../interfaces/alumno";
import {AuthenticationService} from "../services/authentication.service";
import {AsignarMaestroComponent} from "../forms/asignar-maestro/asignar-maestro.component";
import {MatDialog, MatDialogActions} from "@angular/material";
import {AsignarAlumnoGradoComponent} from "../forms/asignar-alumno-grado/asignar-alumno-grado.component";

@Component({
    selector: 'app-profilealumno',
    templateUrl: './profilealumno.component.html',
    styleUrls: ['./profilealumno.component.scss']
})
export class ProfilealumnoComponent implements OnInit {

    alumnoId: any;
    title: string = 'Alumno';
    user: Alumno[];
    uid;
    grd;
    sub;

    constructor(private authService: AuthenticationService, private activatedRoute: ActivatedRoute,
                private userService: UserService, private dialog: MatDialog) {
        this.authService.getStatus().subscribe(
            (user)=>{
                this.uid= user.uid;
            }
        );
        this.alumnoId = this.activatedRoute.snapshot.params['uid'];
        this.grd = this.activatedRoute.snapshot.params['rep'];
        const route = {
            idt: this.grd,
            uid: this.alumnoId
        };
        this.sub = this.userService.getAlumno(route).valueChanges().subscribe(
            (alumno: Alumno[])=>{
                this.user = alumno;
                console.log(alumno);
            }
        );
    }
    openDialog(user): void {
        console.log(user);
        const dialogRef = this.dialog.open(AsignarAlumnoGradoComponent, {
            panelClass: ['modal-color1'],
            data: user
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    ngOnInit() {
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }

}
