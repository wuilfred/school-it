import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {User} from "../interfaces/user";
import { DataService } from '../data.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss'],
    providers: [DataService]
})
export class MyProfileComponent implements OnInit {

    title: string = 'Perfil';
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
