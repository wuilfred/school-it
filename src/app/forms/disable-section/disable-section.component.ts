import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {AuthenticationService} from "../../services/authentication.service";
import {UserService} from "../../services/user.service";
import {AngularFireDatabase} from "@angular/fire/database";
import { MatDialog } from "@angular/material";
import { SeccionFormComponent } from '../seccion-form/seccion-form.component';

@Component({
  selector: 'app-disable-section',
  templateUrl: './disable-section.component.html',
  styleUrls: ['./disable-section.component.scss']
})
export class DisableSectionComponent implements OnInit {
  title = "Sección";
  section
  descripcion:string;
  nombre:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private db: AngularFireDatabase, 
    private auth: AuthenticationService, 
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.section = this.data
    this.descripcion = this.data.Descripcion;
    this.nombre = this.data.Nombre
    console.log(this.section);

        
  }

  ngOnInit() {
    
  }

  disable(){
    const section = {
        Id_colegio:this.section.Id_colegio,
        Status:"0",
        Id:this.section.Id
    }
    console.log(section);
    this.userService.updateSection(section).then(
        (success)=>{
            this.dialog.closeAll();
        }
    ).catch(
      error =>{
          console.log(`error al momento de actualizar ${error}`);
      }
  ) ;
  }

}
