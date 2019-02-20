import { Component, OnInit,Input } from '@angular/core';
import { SeccionFormComponent } from '../forms/seccion-form/seccion-form.component'
import {MatDialog} from "@angular/material";
import {AuthenticationService} from "../services/authentication.service";
import { ColegioSolicitudComponent } from '../forms/colegio-solicitud/colegio-solicitud.component';

@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent implements OnInit {
  title: string = 'Secciones';
  show: boolean;
  query;
  @Input() colegio : SeccionFormComponent;

  constructor(
    private authService: AuthenticationService,
    public dialog: MatDialog
  ) { }

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
    console.log("la variable del componente"+this.colegio)
    
  }

}
