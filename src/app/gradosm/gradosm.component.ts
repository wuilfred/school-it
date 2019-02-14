import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {Grados} from "../interfaces/grado";

@Component({
  selector: 'app-gradosm',
  templateUrl: './gradosm.component.html',
  styleUrls: ['./gradosm.component.scss']
})
export class GradosmComponent implements OnInit {

  grado: Grados[];

  constructor(private userService: UserService, private authS: AuthenticationService) {
    this.authS.getStatus().subscribe(
        (user)=>{
          this.userService.getGM(user.uid).valueChanges().subscribe(
              (grados: Grados[])=>{
                this.grado = grados;
                console.log(grados);
              }
          );
        }
    );
  }

  ngOnInit() {
  }

}
