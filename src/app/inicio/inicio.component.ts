import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../interfaces/user';
import {Colegio} from '../interfaces/colegio';
import {Maestro} from '../interfaces/maestro';
import {AngularFireDatabase} from '@angular/fire/database';
import {Sede} from '../interfaces/sede';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {GradoFormComponent} from '../forms/grado-form/grado-form.component';
import {ChooseSchComponent} from '../forms/choose-sch/choose-sch.component';
import {forEach} from '@angular/router/src/utils/collection';
import {map} from 'rxjs/internal/operators';
import {Role} from '../interfaces/role';
import {AsignarMaestroComponent} from '../forms/asignar-maestro/asignar-maestro.component';
import {NuevoDiarioComponent} from '../forms/nuevo-diario/nuevo-diario.component';
import {NuevoAvisoComponent} from '../forms/nuevo-aviso/nuevo-aviso.component';
import { DataService } from '../data.service';
// forms
import { AddInfoFormComponent } from '../forms/add-information/add-information.component';
import { SedeComponent } from '../forms/sede/sede.component';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
    providers: [DataService]
})
export class InicioComponent implements OnInit {

    title: String = 'Inicio';
    colid;
    colegio: Colegio[];
    sede: Sede[];
    cols: Colegio[];
    mi;
    n: string = null;
    user: User[];
    key;

    constructor(private authService: AuthenticationService,
                private router: Router,
                private userService: UserService,
                private Route: ActivatedRoute,
                public dialog: MatDialog,
                public dataService: DataService) {

        this.authService.getStatus().subscribe(
            (user) => {
                this.userService.getURole(user.uid).valueChanges().subscribe(
                    (role: Role) => {
                        if (role.Tipo === 'colegio') {
                            this.userService.getColegioo(user.uid).valueChanges().subscribe(
                                (colegio: Colegio[]) => {
                                    if (!user.hasOwnProperty('Nombre')) {
                                        this.addInformation();
                                        /*const dialogRef = this.dialog.open(SedeComponent, {
                                            panelClass: ['modal-color1', 'modal-border'],
                                        });
                                        dialogRef.afterClosed().subscribe(result => {
                                            console.log('closed');
                                        });*/
                                    }
                                    this.colegio = colegio;
                                    //console.log('colegios', this.colegio);
                                    /*this.userService.getSede(user.uid).valueChanges().subscribe(
                                        (sede: Sede[]) => {
                                            this.sede = sede;
                                            console.log(sede);
                                        }
                                    );*/
                                    this.userService.getColegios(user.uid).valueChanges().subscribe(
                                        (colegio: Colegio[]) => {
                                            // if (colegio.length == 0) {
                                            //     this.router.navigate(['instituciones']);
                                            // }
                                            console.log(`colegios: ${colegio.length}`);
                                            this.cols = colegio;
                                        }
                                    );
                                }
                            );
                            } else if (role.Tipo === 'maestro') {
                            this.router.navigate(['grados/list']);
                        } else if (role.Tipo === 'tutor') {
                            this.router.navigate(['alumnos/list']);
                        }
                    }
                );
            }
        );
    }

    replaceComercial (id): void {
        this.authService.getStatus().subscribe(
            (user) => {
            this.dataService.institucionId = id.id;
            const key = 'idinstitucion';
            localStorage.setItem(key, id.id);
            console.log('New id is: ' , this.dataService.institucionId);
            this.router.navigate(['profile/' + user.uid]);
        });
    }

    addInformation () {
        this.authService.getStatus().subscribe(
            (user) => {
                this.userService.getURole(user.uid).valueChanges().subscribe(
                    (role: Role) => {
                        console.log('role tipo es: *************', role);
                        switch (role.Tipo) {
                            case 'colegio':
                            const dialogRef = this.dialog.open(AddInfoFormComponent, {
                                    panelClass: ['modal-color1', 'modal-border'],
                                });

                                dialogRef.afterClosed().subscribe(result => {
                                    console.log('closed');
                                });
                            break;
                            case 'tutor':
                                console.log('Role tipo institucion');
                            break;
                            case 'maestros':
                                console.log('Role tipo institucion');
                            break;
                        }
                    }
                );
            }
        );
    }

    createSchool () {
        this.router.navigate(['instituciones']);
        this.cols =  this.colegio;
    }

    openDialog(): void {
        console.log();
        const dialogRef = this.dialog.open(NuevoAvisoComponent, {
            panelClass: ['modal-color1', 'modal-border'],
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    ngOnInit() {
        if (this.n == null) {
            console.log('null :(');
            /*const dialogRef = this.dialog.open(ChooseSchComponent, {
                panelClass: ['modal-color1'],
            });

            dialogRef.afterClosed().subscribe(result => {
                console.log('closed');
            });*/
        }
    }
}
