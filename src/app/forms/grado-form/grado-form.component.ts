import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-grado-form',
    templateUrl: './grado-form.component.html',
    styleUrls: ['./grado-form.component.scss']
})
export class GradoFormComponent implements OnInit {

    user;
    users;
    nombre;
    req;
    edmx;
    edmi;
    des;
    uid;

    constructor(private authService: AuthenticationService, private userService: UserService,
                private angularFireDb: AngularFireDatabase, public dialog: MatDialog) {
    }

    createGrado() {
        this.authService.getStatus().subscribe(
            (user) => {
                this.user = user.uid;
                this.uid = this.angularFireDb.createPushId();
                const grd = {
                    'nombre': this.nombre,
                    'requisitos': this.req,
                    'edad_maxima': this.edmx,
                    'edad_minima': this.edmi,
                    'descripcion': this.des,
                    'id_representante': this.user,
                    'id': this.uid,
                };

                this.userService.createGrado(grd).then(
                    (data) => {
                        console.log(`exito ${data}`);
                        this.dialog.closeAll();
                    }
                ).catch(
                    (error) => {
                        console.log(`ocurrio un error ${error}`);
                    }
                );
            }
        );
    }

    ngOnInit() {
    }

}
