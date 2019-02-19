///<reference path="forms/materia/materia.component.ts"/>
///<reference path="forms/nueva-tarea/nueva-tarea.component.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { GradosComponent } from './grados/grados.component';
import { MenuComponent } from './menu/menu.component';
import {RouterModule, Routes} from "@angular/router";
import {SearchPipe} from "./pipe/search";
import {FormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import { ProfilemaestroComponent } from './profilemaestro/profilemaestro.component';
import {AuthenticationGuard} from "./services/authentication.guard";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from "./material";
import { DataService } from "./data.service";
import { EndComponentComponent } from './end-component/end-component.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProfilealumnoComponent } from './profilealumno/profilealumno.component';
import { GradosdetailComponent } from './gradosdetail/gradosdetail.component';
import { GradoFormComponent } from './forms/grado-form/grado-form.component';
import { MaestroFormComponent } from './forms/maestro-form/maestro-form.component';
import { AlumnoFormComponent } from './forms/alumno-form/alumno-form.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChooseSchComponent } from './forms/choose-sch/choose-sch.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { CreateColegioComponent } from './create-colegio/create-colegio.component';
import { GradosmComponent } from './gradosm/gradosm.component';
import {SolicitudesScComponent} from "./solicitudes-sc/solicitudes-sc.component";
import { AsignarMaestroComponent } from './forms/asignar-maestro/asignar-maestro.component';
import { MateriasComponent } from './materias/materias.component';
import { GradosVerComponent } from './grados-ver/grados-ver.component';
import { AlumnosListComponent } from './alumnos-list/alumnos-list.component';
import { NuevoAlumnoComponent } from './forms/nuevo-alumno/nuevo-alumno.component';
import { MateriaComponent } from './forms/materia/materia.component';
import { NuevaTareaComponent } from './forms/nueva-tarea/nueva-tarea.component';
import { AlumnoProfileComponent } from './alumno-profile/alumno-profile.component';
import { ColegiosListaComponent } from './colegios-lista/colegios-lista.component';
import { NuevoDiarioComponent } from './forms/nuevo-diario/nuevo-diario.component';
import { ColegioSolicitudComponent } from './forms/colegio-solicitud/colegio-solicitud.component';
import { AsignarAlumnoGradoComponent } from './forms/asignar-alumno-grado/asignar-alumno-grado.component';
import { GradoAlumnoComponent } from './grado-alumno/grado-alumno.component';
import { NuevoAvisoComponent } from './forms/nuevo-aviso/nuevo-aviso.component';
import { userRecoverPassForm } from './forms/recover-pass/recover-pass.component';
import { AddInfoFormComponent } from './forms/add-information/add-information.component';
import { SedeComponent } from './forms/sede/sede.component';
import { SeccionesComponent } from './secciones/secciones.component';
import { SeccionFormComponent } from './forms/seccion-form/seccion-form.component';
import { NuevatareaComponent } from './nuevatarea/nuevatarea.component';
import { TareasComponent } from './forms/tareas/tareas.component';
import { DiarioComponent } from './forms/diario/diario.component'

const appRoutes: Routes = [
    {path: 'inicio', component: InicioComponent, canActivate: [AuthenticationGuard]},
    {path: 'solicitudes', component: SolicitudesComponent, canActivate: [AuthenticationGuard]},
    {path: 'maestros', component: MaestrosComponent, canActivate: [AuthenticationGuard]},
    {path: 'maestros/profile/:uid', component: ProfilemaestroComponent, canActivate: [AuthenticationGuard]},
    {path: 'grados', component: GradosComponent, canActivate: [AuthenticationGuard]},
    {path: 'grados/detail/:grd', component: GradosdetailComponent, canActivate: [AuthenticationGuard]},
    {path: 'alumnos', component: AlumnosComponent, canActivate: [AuthenticationGuard]},
    {path: 'instituciones', component: CreateColegioComponent, canActivate: [AuthenticationGuard]},
    {path: 'profile/:uid', component: MyProfileComponent, canActivate: [AuthenticationGuard]},
    {path: 'materias', component: MateriasComponent, canActivate: [AuthenticationGuard]},
    {path: 'alumnos/profile/:rep/:uid', component: ProfilealumnoComponent, canActivate: [AuthenticationGuard]},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},

    {path: 'alumnos/list', component: AlumnosListComponent, canActivate: [AuthenticationGuard]},
    {path: 'alumno/grado/:col/:grd', component: GradoAlumnoComponent, canActivate: [AuthenticationGuard]},
    {path: 'colegios/list/:uid', component: ColegiosListaComponent, canActivate: [AuthenticationGuard]},
    {path: 'alumno/profile/:idt/:uid', component: AlumnoProfileComponent, canActivate: [AuthenticationGuard]},

    {path: 'secciones', component: SeccionesComponent, canActivate: [AuthenticationGuard]},

    /////masters
    {path: 'grados/ver/:uid/:grd', component: GradosVerComponent, canActivate: [AuthenticationGuard]},
    {path: 'grados/list', component: GradosmComponent, canActivate: [AuthenticationGuard]},
    {path: 'solicitudes/sc', component: SolicitudesScComponent, canActivate: [AuthenticationGuard]},

    {path: 'sede', component: SedeComponent, canActivate: [AuthenticationGuard]},
    {path: 'tareas', component: TareasComponent, canActivate: [AuthenticationGuard]},
    {path: 'diario', component: DiarioComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MaestrosComponent,
    AlumnosComponent,
    GradosComponent,
    MenuComponent,
    SearchPipe,
    ProfilemaestroComponent,
    EndComponentComponent,
    InicioComponent,
    ProfilealumnoComponent,
    GradosdetailComponent,
    GradoFormComponent,
    MaestroFormComponent,
    AlumnoFormComponent,
    MyProfileComponent,
    ChooseSchComponent,
    SolicitudesComponent,
    CreateColegioComponent,
    GradosmComponent,
    SolicitudesScComponent,
    AsignarMaestroComponent,
    MateriasComponent,
    GradosVerComponent,
    AlumnosListComponent,
    NuevoAlumnoComponent,
    MateriaComponent,
    NuevaTareaComponent,
    AlumnoProfileComponent,
    ColegiosListaComponent,
    NuevoDiarioComponent,
    ColegioSolicitudComponent,
    AsignarAlumnoGradoComponent,
    GradoAlumnoComponent,
    NuevoAvisoComponent,
    userRecoverPassForm,
    AddInfoFormComponent,
    SedeComponent,
    SeccionesComponent,
    SeccionFormComponent,
    NuevatareaComponent
    TareasComponent,
    DiarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MaterialModule
  ],
  entryComponents: [
      GradoFormComponent,
      MaestroFormComponent,
      AlumnoFormComponent,
      ChooseSchComponent,
      AsignarMaestroComponent,
      NuevoAlumnoComponent,
      MateriaComponent,
      NuevaTareaComponent,
      NuevoDiarioComponent,
      AsignarAlumnoGradoComponent,
      NuevoAvisoComponent,
      ColegioSolicitudComponent,
      userRecoverPassForm,
      AddInfoFormComponent,
      SedeComponent,
      SeccionesComponent,
      SeccionFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
