import { Component, OnInit } from '@angular/core';
import { NuevoAvisoComponent } from '../forms/nuevo-aviso/nuevo-aviso.component'
import { DisableSectionComponent } from '../forms/disable-section/disable-section.component';
import { MatDialog } from "@angular/material";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";
import { element } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss']
})
export class AvisosComponent implements OnInit {
  colid
  avisos : any[];
  show : boolean;
  title = "Avisos";
  i : number = 0;
  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private userService : UserService
  ) {

    this.authService.getStatus().subscribe(
      (user) => {
        this.userService.checkIdSchool().then(response => {
          console.log(response);
          this.colid = this.userService.getAvisos(response).valueChanges().subscribe(
                (aviso) => {
                  aviso.forEach(element => {
                      this.avisos = [this.returnArray(element)];
                      console.log(this.avisos)
                  }); 
              }
          )

          this.userService.getSection(response).valueChanges().subscribe(
            (seccion: any[]) => {
                //this.avisos = seccion;
                console.log(seccion)
            }
          )
          
        },
          (err) => {
              console.log('Error, is not a institution', err);
          }
        );

      }
    );

   }

  returnArray(array){
    let temp : any[];
    let i : number = 0;
      for (let prop in array) {
        temp =array[prop];
        i++;
        //console.log(array[prop]);
      }
      return temp;
  } 

  ngOnInit() {


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
    const dialogRef = this.dialog.open(NuevoAvisoComponent, {
        panelClass: ['modal-border', 'modal-color1'],
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
    });
  }


}
