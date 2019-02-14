import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {AsignarMaestroComponent} from "../forms/asignar-maestro/asignar-maestro.component";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-alumno-profile',
    templateUrl: './alumno-profile.component.html',
    styleUrls: ['./alumno-profile.component.scss']
})
export class AlumnoProfileComponent implements OnInit {

    idt;
    uid;
    title: string = 'Alumno';
    user;

    constructor(private activatedRoute: ActivatedRoute,
                private authService: AuthenticationService,
                private dialog: MatDialog,
                private userService: UserService) {

        this.idt = this.activatedRoute.snapshot.params['idt'];
        this.uid = this.activatedRoute.snapshot.params['uid'];
        const route = {
            'idt' : this.idt,
            'uid' : this.uid
        }
        this.userService.getAlumno(route).valueChanges().subscribe(
            (alumno)=>{
                this.user = alumno;
            }
        );
    }

    openDialog(user): void {
        console.log(user);
        const dialogRef = this.dialog.open(AsignarMaestroComponent, {
            panelClass: ['modal-color1'],
            data: user
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    ngOnInit() {
    }

}
