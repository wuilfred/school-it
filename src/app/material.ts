import {
    MatButtonModule, MatCheckboxModule, MatDividerModule, MatInputModule,
    MatSlideToggleModule
} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Input, NgModule} from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from "@angular/material";
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatSidenavModule,
    MatToolbarModule, MatExpansionModule, MatListModule, MatDividerModule,
    MatSlideToggleModule, MatInputModule, MatDialogModule, MatTabsModule, MatRippleModule,
    MatCardModule],

    exports: [MatButtonModule, MatCheckboxModule, MatSidenavModule,
    MatToolbarModule, MatExpansionModule, MatListModule, MatDividerModule,
    MatSlideToggleModule, MatInputModule, MatDialogModule, MatTabsModule, MatRippleModule,
    MatCardModule],
})
@Input(

)
export class MaterialModule { }