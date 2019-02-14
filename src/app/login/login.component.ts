import {Component, NgZone, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "../services/user.service";
import {FirebaseDatabase} from "@angular/fire";
import {AngularFireDatabase} from "@angular/fire/database";
import {userRecoverPassForm} from "../forms/recover-pass/recover-pass.component";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    operation: string = 'login';
    ow: boolean = false;
    am: boolean = false;
    ma: boolean = false;
    n: boolean = false;
    selected: boolean = true;

    email: string;
    password: string;

    Nombre: string;
    Apellido: string;
    dpi: string;
    departamento: string;
    municipio: string;
    nit: string;
    telefono: string;

    profesion: string;
    frase: string;

    cNombre: string;
    cNombreL: string;
    cEmail: string;
    cTelefono: string;
    cDireccion: string;
    cDepartamento: string;
    cHorario: string;
    cMunicipio: string;
    cMision: string;
    cVision: string;
    cSite: string;

    constructor(private authService: AuthenticationService,
                private userService: UserService,
                private db: AngularFireDatabase,
                private router: Router,
                public ngZone: NgZone,
                private dialog: MatDialog) {
    }

    createUser() {
        this.authService.register(this.email, this.password).then(
            (data) => {
                console.log(`user id to data is ${data.user.uid}`);
                const user = {
                    uid: data.user.uid,
                    Nombre: this.Nombre,
                    Apellido: this.Apellido,
                    Correo: this.email,
                    Role: 'colegio',
                    Dpi: this.dpi,
                    Departamento: this.departamento,
                    Municipio: this.municipio,
                    Nit_factura: this.nit,      
                    Telefono: this.telefono,
                    Url_foto: "",
                    Id_tipo: data.user.uid
                };
                this.userService.createUser(JSON.parse(JSON.stringify(user))).then(
                    (ecsito) => {
                        const user = { 
                            'Tipo': 'colegio',
                            'Id_usuario': data.user.uid,
                            'Timestamp': Date.now(),
                            'Status': 1,
                            'Id_tipo': data.user.uid
                        }
                        this.userService.role(user).then(
                            wwww => {
                                console.log(wwww);
                            }
                        );
                    }
                    /*{
                        this.userService.createSchool(colegio).then(
                            (data) => {
                                console.log('colegio creado');
                                this.router.navigate(['inicio']);
                            }
                        ).catch(
                            error =>{
                                console.log(`error al crear colegio ${error}`);
                            }
                        );
                        console.log(`ecsito ${ecsito}`);
                    }*/
                );
            }
        ).catch(
            (error) => {    
                if (error) {
                    if (error.message.search('email address is already in use')>=0) {
                        alert('El correo ya esta siendo utilizado por otro usuario');
                    } else {
                        alert( `Error: ${error}`);
                    }
                }
            }
        );
    }

    createM() {
        this.authService.register(this.email, this.password).then(
            (data) => {
                console.log('ESTOY REGISTRANDO SIN NIT DE USUARIO');
                const master = {
                    uid: data.user.uid,
                    Nombre: this.Nombre,
                    Apellido: this.Apellido,
                    Correo: this.email,
                    Dpi: this.dpi,
                    Role: 'maestro',
                    Departamento: this.departamento,
                    Municipio: this.municipio,
                    Telefono: this.telefono,
                    Profesion: this.profesion,
                    Frase: this.frase
                };
                this.userService.createMaster(JSON.parse(JSON.stringify(master))).then(
                    (datas) => {
                        console.log('maestro creado');
                        const user = {
                            'Tipo': 'maestro',
                            'Id_usuario': data.user.uid,
                            'Timestamp': Date.now(),
                            'Status': 1,
                            'Id_tipo': data.user.uid
                        }
                        this.userService.role(user).then(
                            wwww => {
                                console.log('master');
                            }
                        );
                        this.router.navigate(['inicio']);
                    }
                ).catch(
                    (error) => {
                        if (error) {
                            if (error.message.search('email address is already in use')>=0) {
                                alert('El correo ya esta siendo utilizado por otro usuario');
                            } else {
                                alert( `Error: ${error}`);
                            }
                        }
                    }
                );
            }
        ).catch(error => {
            alert('ocurrio un error al registrar');
        });
    }

    createT(){
        this.authService.register(this.email, this.password).then(
            (data)=>{
                const user = {
                    uid: data.user.uid,
                    Nombre: this.Nombre,
                    Apellido: this.Apellido,
                    Correo: this.email,
                    Role: 'tutor',
                    Dpi: this.dpi,
                    Departamento: this.departamento,
                    Municipio: this.municipio,
                    Telefono: this.telefono
                };
                this.userService.createTutor(JSON.parse(JSON.stringify(user))).then(
                    (userr)=>{
                        console.log(`creado ${userr}`);
                        const userrr = {
                            'Tipo': 'tutor',
                            'Id_usuario': data.user.uid,
                            'Timestamp': Date.now(),
                            'Status': 1,
                            'Id_tipo': data.user.uid
                        }
                        this.userService.role(userrr).then(
                            wwww => {
                                console.log(wwww);
                            }
                        );
                    }
                );
            }
        );
    }

    ngOnInit() {
    }

    recoverPass (): void {
        const dialogRef = this.dialog.open(userRecoverPassForm, {
            panelClass: ['modal-color1', 'modal-border'],
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('closed');
        });
    }

    login() {
        this.authService.loginWithEmail(this.email, this.password).then(
            (data) => {
                if (data.user.emailVerified !== true) {
                    this.authService.verify();
                    this.authService.logout();
                    window.alert('verifica tu mail');
                } else {
                    this.ngZone.run(() => {
                        this.router.navigate(['inicio']);
                    });
                }
            }
        ).catch(
            (error) => {
                if (error) {
                    if (error.message.search('email address is already in use')>=0) {
                        alert('El correo ya esta siendo utilizado por otro usuario');
                    } else {
                        alert( `Error: ${error}`);
                    }
                }
            }
        );
    }
}
