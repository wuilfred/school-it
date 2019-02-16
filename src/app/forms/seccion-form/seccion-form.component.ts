import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-seccion-form',
  templateUrl: './seccion-form.component.html',
  styleUrls: ['./seccion-form.component.scss']
})
export class SeccionFormComponent implements OnInit {

    nombre: string;
    descripcion : string;

    constructor(private db: AngularFireDatabase, 
                private auth: AuthenticationService, 
                private userService: UserService,
                public dialog: MatDialog) {
        this.auth.getStatus().subscribe(
            (user)=>{
                
            }
        );
    }

    crearSeccion(){

        //create object for save 
        const alm = {    
        }
        
    }
    close(){
        this.dialog.closeAll();
    }
    ngOnInit() {
    }

}
