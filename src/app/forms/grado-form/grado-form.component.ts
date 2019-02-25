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
                this.userService.checkIdSchool().then(response => {
                    const grd = {
                        'Nombre': this.nombre,
                        'Requisitos': this.req,
                        'Edadmax': this.edmx,
                        'Edadmin': this.edmi,
                        'Descripcion': this.des,
                        'Id_representante': this.user,
                        'Id': this.uid,
                        'Id_colegio': response,
                        'Status': '1',
                        'Timestamp': new Date().getTime()  
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
                });
            }
        );
    }

    ngOnInit() {
    }

}
