import { Component, OnInit,Input } from '@angular/core';
import { SeccionFormComponent } from '../forms/seccion-form/seccion-form.component'
import { MatDialog } from "@angular/material";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { Seccion } from "../interfaces/seccion";

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent implements OnInit {
  title: string = 'Secciones';
  show: boolean;
  query;
  secciones:Seccion[];
  colid;

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private userService : UserService
  ) { 
      this.authService.getStatus().subscribe(
        (user) => {
            this.colid = this.userService.getSection(user.uid).valueChanges().subscribe(
                (seccion: Seccion[]) => {
                    this.secciones = seccion;
                }
            );
            console.log("Usuario"+user.uid);
        }
      );
      console.log("Variable de secciones"+this.secciones);
  }

  searchT() {
    this.show = !this.show;
    if (this.show) {
        this.show = true;
    } else {
        this.show = false;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SeccionFormComponent, {
        panelClass: ['modal-border', 'modal-color1'],
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
    });
  }

  ngOnInit() {
    console.log("la variable del componente")
    
  }

  off(obj){
    console.log(obj);
  }

}
