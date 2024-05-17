
import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-vendors',
  templateUrl: './recent-vendors.component.html',
  styleUrls: ['./recent-vendors.component.scss']
})
export class RecentVendorsComponent implements OnInit {
  surveyorList: any[] = [];
  allUserInfoData: any[] = [];
  pageSize: number = 5; // Number of items to show per page
  currentPage: number = 1; // Current page

  constructor(private api: ApiService,private datePipe: DatePipe,private router: Router,private zone: NgZone) { }
  isLoading: boolean = true;
  ngOnInit(): void {
    console.log("i am inside the resent vendors")
    this.RecentVendorData();
    // this.addCertifiedFieldToVendors();
  }

  addCertifiedFieldToVendors(): void {
    // Call the function from the ApiService
    // this.api.addCertifiedFieldToVendors();
  }
  changeCertificationStatus(user: any): void {
    if (user && user.vendorList && user.vendorList.__zone_symbol__value && user.vendorList.__zone_symbol__value.newVendorData) {
      if (!user.vendorList.__zone_symbol__value.newVendorData.Certified) {
        this.api.updateVendorCertifiedStatus(user.surveyorId,user.id,true ).subscribe((res: any)=>{
           user.vendorList.__zone_symbol__value.newVendorData.Certified = true; // Change status to "Certified"
          console.log("data update successfully")
        })
       
      } else {

      }
    }
  }
  RecentVendorData() {
    this.isLoading = true;

      this.api.getSurveyorsWithVendorInfo().subscribe(
        (res: any) => {
          this.zone.run(() => {
          this.surveyorList = res;
          console.log('Firestore response:', this.surveyorList);
          
          this.isLoading = false;
        });
        },
        (error: any) => {
          console.log('Firestore error:', error);
          console.error('Error getting vendors:', error);
        }
      )


   ;
  }
  
  // get pagedUsers(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   return this.surveyorList.slice(startIndex, endIndex);
  // }
  toggleCertifiedStatus(user: any) {
    // Assuming 'Certified' key is inside 'AddNewVendor' object
    user.AddNewVendor.__zone_symbol__value.newVendorData.Certified = true; // Change 'Certified' value to true
  }
  hasMoreItems(): boolean {
    return this.currentPage * this.pageSize < this.surveyorList.length;
  }

  loadMore() {
    this.currentPage++;
  }
  goDetails(user: any) {
    this.router.navigate(['/details'], { state: { user } });
  }
}