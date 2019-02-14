import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'add-information-add',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.scss']
})
export class AddInfoFormComponent implements OnInit {

  descripcion: string;
  direccion: string;
  lema: string;
  nit: string;
  nombre: string;
  zona: string;
  constructor(public authService: AuthenticationService,
      public dialog: MatDialog,
      private userService: UserService) {

  }

  saveInformation ()  {
    this.authService.getStatus().subscribe(
      (user) => {
        const information = {
          'uid': user.uid,
          'Descripcion': this.descripcion,
          'Direccion': this.direccion,
          'Lema': this.lema,
          'Nit': this.nit,
          'Nombre': this.nombre,
          'Zona': this.zona
        };
        this.userService.updateInformation(information).then(
          (success) => {
            this.dialog.closeAll();
          }
        );
        console.log('Data is:  is: ', information);
      }
    );
  }

  ngOnInit() {
  }

}
