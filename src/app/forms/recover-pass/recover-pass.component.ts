import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";

@Component({
    selector: 'recover-pass-send',
    templateUrl: './recover-pass.component.html',
    styleUrls: ['./recover-pass.component.scss']
})
export class userRecoverPassForm implements OnInit {

    email;
    user;
    colegio;

    constructor(private authService: AuthenticationService, private userService: UserService,
                private db: AngularFireDatabase,
                public dialog: MatDialog) {
        // this.authService.getStatus().subscribe(
        //     (user)=>{
        //         this.user = user;
        //         this.userService.getColegioo(this.user.uid).valueChanges().subscribe(
        //             (colegio: any[])=>{
        //                 colegio.forEach(
        //                     (data)=>{
        //                         this.colegio = data;
        //                     }
        //                 );
        //             }
        //         );
        //     }
        // );
    }

    recoverPassSend(){

        this.userService.resetPassword(this.email).then(
            (success)=>{
                alert('Se ha enviado un correo directo para recuperar tu información');
                this.dialog.closeAll();
            }
        ).catch((error) => alert(`Ocurrio un error: ${error}`));
    }

    close(){
        this.dialog.closeAll();
    }

    ngOnInit() {
    }

}
