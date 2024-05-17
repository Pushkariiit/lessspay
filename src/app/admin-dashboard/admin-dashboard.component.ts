import { Component, OnInit } from '@angular/core';
import { AppModule } from '../app.module';
import { ApiService } from '../api.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  surveyorList: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  numberOfCertifiedItems: any;
  numberOfNotCertifiedItems: any;
  isLoading: boolean = true;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.RecentVendorData();
  }

  RecentVendorData() {
    this.api.getSurveyorsWithVendorInfo().subscribe(
      (res: any) => {
        this.surveyorList = res;
        console.log('Firestore response:', this.surveyorList);
        this.numberOfCertifiedItems = 0;
        this.numberOfNotCertifiedItems = 0;
        this.surveyorList.forEach((item) => {
          if (
            item.vendorList &&
            item.vendorList.__zone_symbol__value &&
            item.vendorList.__zone_symbol__value.newVendorData
          ) {
            if (item.vendorList.__zone_symbol__value.newVendorData.Certified)
              this.numberOfCertifiedItems++;
            else this.numberOfNotCertifiedItems++;
          }
        });
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.log('Firestore error:', error);
        console.error('Error getting vendors:', error);
      }
    );
  }
}
