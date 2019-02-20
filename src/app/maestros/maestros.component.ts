import {Component, OnInit} from '@angular/core';
import {Maestro} from "../interfaces/maestro";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../interfaces/user";
import {Colegio} from "../interfaces/colegio";
import {MatDialog} from "@angular/material";
import {GradoFormComponent} from "../forms/grado-form/grado-form.component";
import {MaestroFormComponent} from "../forms/maestro-form/maestro-form.component";
import {forEach} from "@angular/router/src/utils/collection";
import {FirebaseAuth} from "@angular/fire";


@Component({
    selector: 'app-maestros',
    templateUrl: './maestros.component.html',
    styleUrls: ['./maestros.component.scss']
})
export class MaestrosComponent implements OnInit {
    maestros;
    user: User[];
    title: string = 'Maestros';
    colid;
    blablaid;
    uid;
    query: string = '';
    show: boolean;


    constructor(public maestroService: UserService, public authService: AuthenticationService, public dialog: MatDialog) {
        this.authService.getStatus().subscribe(
            (user) => {
                /*this.colid = maestroService.getMaestrosA(user.uid).valueChanges().subscribe(
                    (data) => {
                        console.log(data);
                        this.maestroService.getMList(user.uid).valueChanges().subscribe(
                            (master: Maestro[]) => {
                                console.log(master);
                                this.maestros = master;
                            }
                        );
                    }
                );*/

                this.maestroService.checkIdSchool().then(response => {
                        this.colid = this.maestroService.getMasters(response).valueChanges().subscribe(
                            (master: Maestro[]) => {
                                console.log('hola esto es maestros', master);
                                this.maestros = master;
                            }
                        );
                    },
                    (err) => {
                        console.log('Erro is institucion', err);
                    }
                );
            }
        );
    }

    searchT() {
        this.show = !this.show;
        if (this.show) {
            this.show = true;
        } else {
            this.show = false;
        }
    }

    getMastersData(ma) {
        this.maestroService.getMaestro(ma).valueChanges().subscribe(
            (master: Maestro) => {
                console.log(master);
                this.maestros = master;
            }
        );
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(MaestroFormComponent, {
            panelClass: ['modal-color1'],
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    ngOnInit() {
        this.searchT();
    }
    ngOnDestroy(){
        ///this.colid.unsubscribe();
        ///console.log('maestros destroyed');
    }

}
