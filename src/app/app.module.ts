import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminVendorsComponent } from './admin-vendors/admin-vendors.component';
import { AdminSurveyorsComponent } from './admin-surveyors/admin-surveyors.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from 'src/firebase-config';
import { AngularFireModule } from '@angular/fire/compat';
import { ApiService } from './api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { VendorsInformationComponent } from './vendors-information/vendors-information.component';
import { DetailsComponent } from './details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminTvcComponent } from './admin-tvc/admin-tvc/admin-tvc.component';


@NgModule({
    declarations: [
        AppComponent,
        AdminReportComponent,
        AdminVendorsComponent,
        AdminSurveyorsComponent,
        AdminDashboardComponent,
        LoginComponent,
        VendorsInformationComponent,
        DetailsComponent,
        AdminTvcComponent
        
        
    ],
    providers: [ApiService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        NgbModule,
        FormsModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    exports: [
        
      ]
})
export class AppModule {
    constructor() {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
       
      }
    
 }

