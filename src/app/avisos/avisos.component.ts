import { Component, OnInit } from '@angular/core';
import { NuevoAvisoComponent } from '../forms/nuevo-aviso/nuevo-aviso.component'
import { DisableSectionComponent } from '../forms/disable-section/disable-section.component';
import { MatDialog } from "@angular/material";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";

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

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private userService : UserService
  ) {

    this.authService.getStatus().subscribe(
      (user) => {
        this.userService.checkIdSchool().then(response => {
          console.log(response);
          this.colid = this.userService.getSection(response).valueChanges().subscribe(
            (seccion: any[]) => {
                this.avisos = seccion;
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
