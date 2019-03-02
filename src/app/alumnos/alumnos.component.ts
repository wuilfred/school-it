import {Component, OnInit} from '@angular/core';

import {UserService} from '../services/user.service';
import {User} from "../interfaces/user";
import {Colegio} from "../interfaces/colegio";
import {Alumno} from "../interfaces/alumno";
import {AuthenticationService} from "../services/authentication.service";
import {GradoFormComponent} from "../forms/grado-form/grado-form.component";
import {MatDialog} from "@angular/material";
import {AlumnoFormComponent} from "../forms/alumno-form/alumno-form.component";

@Component({
    selector: 'app-alumnos',
    templateUrl: './alumnos.component.html',
    styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
    query: string = '';
    show: boolean;
    title: string = 'Alumnos';
    alumnos;
    un;

    constructor(public dialog: MatDialog,
                public userService: UserService,
                public authService: AuthenticationService) {
        this.userService.checkIdSchool().then(response => {
           this.authService.getStatus().subscribe(
                (user)=>{
                    this.un = this.userService.getAllAlumnos(response).valueChanges().subscribe(
                        (alumnos)=>{
                            this.alumnos = alumnos;
                            console.log(alumnos);
                        }
                    );
                }
            );
        });
    }
    searchT(){
        this.show = !this.show;
        if(this.show){
            this.show = true;
        }else{
            this.show = false;
        }
    }
    sup(p){
        console.log(p);
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(AlumnoFormComponent, {
            panelClass: ['modal-color1'],
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    ngOnInit() {

    }
    ngOnDestroy(){
        ///this.un.unsubscribe();
    }

}
