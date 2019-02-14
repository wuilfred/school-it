import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {Maestro} from "../interfaces/maestro";
import {Grados} from "../interfaces/grado";
import {Observable} from "rxjs/index";
import {AngularFirestoreCollection} from "@angular/fire/firestore";
import {GradoFormComponent} from "../forms/grado-form/grado-form.component";
import {MatDialog} from "@angular/material";
import {AsignarMaestroComponent} from "../forms/asignar-maestro/asignar-maestro.component";

@Component({
    selector: 'app-profilemaestro',
    templateUrl: './profilemaestro.component.html',
    styleUrls: ['./profilemaestro.component.scss']
})
export class ProfilemaestroComponent implements OnInit {
    maestroId: any;
    maestro: Maestro;
    maestros: Maestro[];
    user;
    grado;
    master: Maestro;
    editingaviso: Maestro;
    show;
    editing: boolean = false;
    title: string = 'Maestro';
    uid: string;
    idm;
    grd;
    u;

    constructor(private activatedRoute: ActivatedRoute,
                private userService: UserService,
                public dialog: MatDialog) {
        this.idm = this.activatedRoute.snapshot.params['uid'];
        this.u = this.userService.getMaestroo(this.idm).valueChanges().subscribe(
            (data)=>{
                this.user = data;
                console.log(data);
            },
            (error)=>{
                console.log(error);
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
        /*this.userService.getMaestros().subscribe(maestros =>{
            this.maestros = maestros;
        });*/
    }

    ngOnDestroy(){
        this.u.unsubscribe();
    }

    editAviso(maestro) {
        this.editing = !this.editing;
        //this.editingaviso = user;
    }

    updateAviso() {
        /*this.userService.updateA(this.user).then(
            (data) => {
                console.log('exito'+data);
            }
        ).catch(
            (error) => {
                console.log('no exito aun :v'+error);
            }
        );*/
    }
}
