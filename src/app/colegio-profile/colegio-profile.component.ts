import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";
import { DataService } from '../data.service';

@Component({
    selector: 'app-colegio-profile',
    templateUrl: './colegio-profile.component.html',
    styleUrls: ['./colegio-profile.component.scss'],
    providers: [DataService]
})
export class SchoolProfileComponent implements OnInit {

    title: string = 'Perfil de colegio';
    user: User[];

    constructor(private authService: AuthenticationService,
                private userService: UserService,
                public dataService: DataService) {
        this.authService.getStatus().subscribe(
            (user) => {
                this.userService.getUsersById(user.uid).valueChanges().subscribe(
                    (data: User[])=>{
                        this.user = data;
                    }

                );
            }
        );
    }

    getIdInstitucion () {
        // console.log('Data service is: ' , local.storage.get('datauser'));
        let myItem = localStorage.getItem('idinstitucion');
        console.log('Id Institu: ', myItem);
        return this.dataService.institucionId;
    }

    ngOnInit() {
    }

}
