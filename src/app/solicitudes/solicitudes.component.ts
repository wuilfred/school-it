import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../services/authentication.service";
import {AngularFireDatabase} from "@angular/fire/database";

@Component({
    selector: 'app-solicitudes',
    templateUrl: './solicitudes.component.html',
    styleUrls: ['./solicitudes.component.scss']
})
  //  let arrayString: Array<string> = ['1', '2', '3'];
export class SolicitudesComponent implements OnInit {

    title: string = 'Solicitudes';
    query: string = '';
    show: boolean;
user;
    solicitud;

    sub;
    ss;
    uid;
    q;
    info=[];
DataDiario;



    constructor(private userService: UserService,    private angularFireDb: AngularFireDatabase,
                private authService: AuthenticationService) {
                  const idinstitucion = localStorage.getItem('idinstitucion');
                  this.authService.getStatus().subscribe(
                    (user) => {
                              this.user = user;
                        this.userService.getSolicitudes(idinstitucion).valueChanges().subscribe(
                          (diario) => {
                            this.info = diario;
                            diario.forEach(
                              (data, key) => {
                                this.DataDiario = Object.keys(this.info[key]).map(function(key2) {

                  const         grd = {
                                      'Estado': diario[key][key2].Estado,
                                      'Id_alumno': diario[key][key2].Id_alumno,
                                      'Id_maestro': diario[key][key2].Id_maestro,
                                      'Id_colegio': diario[key][key2].Id_colegio,
                                      'Id_representante': diario[key][key2].Id_representante,
                                      'Id_representante_alumno': diario[key][key2].Id_representante_alumno,
                                      'Id_usuario': diario[key][key2].Id_usuario,
    'Nombre_colegio': diario[key][key2].Nombre_colegio,
        'Nombre_usuario':diario[key][key2].Nombre_usuario,

                                      'Id':key2,

                                      'Status':diario[key][key2].Status,
                                          'Telefono_colegio': diario[key][key2].Telefono_colegio,
                                    'Tipo_usuario': diario[key][key2].Tipo_usuario,
                                  };






                                      return  grd;
                                 });

                                 this.solicitud=(this.DataDiario);
                                 console.log(this.solicitud);
                              }
                            );
                          }
                        );
                    }
                  );

    }

    delete(dd){
        const d = {
            'uid': this.uid,
            's': dd
        };
        this.userService.deleteSolicitud(d).then(
            (d)=>{
                console.log(d);
            }
        );

    }

    assign(asi){


        if(asi.Tipo_usuario == 'alumno'){

          const grd = {
Id_alumno:asi.Id_alumno,
Id_colegio:asi.Id_colegio,
Id_representante:asi.Id_representante,
Id_representante_alumno:asi.Id_representante_alumno,
Id_solicitud:asi.Id,
Id_usuario:this.user.uid,
Status:"1",
Status_solicitud:"aceptado",
Timestamp:  new Date().getTime(),
Id: this.angularFireDb.createPushId()

          };

        this.userService.createAsign("alumno",grd).then(
            (s)=>{
              const alumnoRoute = {
                'Estado':"aceptado",
                'Id_alumno': asi.Id_alumno,
                'Id_colegio': asi.Id_colegio,
                'Id_representante': asi.Id_representante,
                'Id_representante_alumno': asi.Id_representante_alumno,
                'Id_usuario': asi.Id_usuario,
'Nombre_colegio':asi.Nombre_colegio,
'Nombre_usuario':asi.Nombre_usuario,

                'Id':asi.Id,

                'Status':asi.Status,
                    'Telefono_colegio': asi.Telefono_colegio,
              'Tipo_usuario': asi.Tipo_usuario
                         }
                         this.userService.updateSolicitudAlm(alumnoRoute).then(
                             (alumno)=>{
                               //  console.log('updated');
                             }
     );




            }
        ).catch(
            (error)=>{
                console.log('error');
            }
        );

}else  if(asi.Tipo_usuario == 'maestro'){
  const grd = {
Id_maestro:asi.Id_maestro,
Id_colegio:asi.Id_colegio,
Id_representante:asi.Id_representante,
Id_solicitud:asi.Id,
Id_usuario:this.user.uid,
Status:"1",
Status_solicitud:"aceptado",
Timestamp:  new Date().getTime(),
Id: this.angularFireDb.createPushId()

  };


  console.log(grd);
this.userService.createAsignD("maestro",grd).then(
    (s)=>{
      const alumnoRoute = {
        'Estado':"aceptado",
        'Id_maestro': asi.Id_maestro,
        'Id_colegio': asi.Id_colegio,
        'Id_representante': asi.Id_representante,

        'Id_usuario': asi.Id_usuario,
'Nombre_colegio':asi.Nombre_colegio,
'Nombre_usuario':asi.Nombre_usuario,

        'Id':asi.Id,

        'Status':asi.Status,
            'Telefono_colegio': asi.Telefono_colegio,
      'Tipo_usuario': asi.Tipo_usuario
                 }
                 this.userService.updateSolicitudMa(alumnoRoute).then(
                     (alumno)=>{
                       //  console.log('updated');
                     }
);




    }
).catch(
    (error)=>{
        console.log('error');
    }
);


}

    }

    searchT() {
        this.show = !this.show;
        if (this.show) {
            this.show = true;
        } else {
            this.show = false;
        }
    }

    ngOnInit() {
    }
    ngOnDestroy(){
        console.log('destroyed');
        ///this.sub.unsubscribe();
    }

}
