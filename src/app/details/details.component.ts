import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedForm: string | null = null;
  fullName: string = ''; 
  firstName: string = ''; 
  lastName: string = ''; 
  gender: string = ''; 
  date: Date | null = null; 
  dateOfBirth: string = ''; 
  phoneNumber: string = ''; 
  landlineNumber: string = ''; 
  emailAddress: string = ''; 
  address: string = '';
  address1: string = '';
  city: string = '';
  landmark: string = '';
  pinCode: string = '';
  area: string = '';
  guardian: string = ''; 
  widowed: boolean = false; 
  user: any;
  educationLevel: string = '';
  annualIncome: string = '';
  aadharDocumentUrl: string = '';
  panDocumentUrl: string = '';
  challanUrl: string = '';
  additionalDocumentUrl: string = '';
  siteOfVending: string = '';
  yearsOfVending: string = '';
  timeOfVending: Date | null = null; 
  selectedVendingType: string = '';
  memberOneName: string = '';
  memberOneAadhar: string = '';
  memberOneOccupation: string = '';
  memberTwoOccupation: string = '';
  memberTwoAadhar: string = '';
  memberTwoName: string = '';
  dropdownMenu: string = '';
  accountHolderName: string = '';
  bankName: string = '';
  branch: string = '';
  ifscCode: string = '';
  accountNum: string = '';
  siteLocationUrl: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.user = history.state.user;
    this.extractUserData();
  }

  extractUserData(): void {
    if (!this.user) {
      return;
    }
    this.firstName = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.firstName || 'N/A';
    this.lastName = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.lastName || 'N/A';
    this.gender = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.spinnerGender || 'N/A';
    this.dateOfBirth = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.dob || 'N/A';
    this.phoneNumber = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.phoneNum || 'N/A'
    this.landlineNumber = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.landline || 'N/A';
    this.emailAddress = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.emailAddress || 'N/A';
    this.fullName = this.user?.vendorList?.__zone_symbol__value?.newVendorData?.ownerName || 'N/A'
    this.date = this.user?.vendorList?.__zone_symbol__value?.newVendorData?.currentDate || 'N/A'
    this.guardian = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.nameParents || 'N/A';    
    this.widowed = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.widow || false;
    this.address = this.user?.AccountInformation?.__zone_symbol__value?.permanentAddress?.address1 || 'N/A';
    this.address1 = this.user?.AccountInformation?.__zone_symbol__value?.permanentAddress?.address2 || 'N/A';
    this.area = this.user?.AccountInformation?.__zone_symbol__value?.permanentAddress?.area || 'N/A';
    this.city = this.user?.AccountInformation?.__zone_symbol__value?.permanentAddress?.city || 'N/A';
    this.landmark = this.user?.AccountInformation?.__zone_symbol__value?.permanentAddress?.landmar || 'N/A';
    this.pinCode = this.user?.AccountInformation?.__zone_symbol__value?.permanentAddress?.pinCode || 'N/A';
    this.educationLevel = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.educationLevelSpinner || 'N/A';
    this.annualIncome = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.annualIncome || 'N/A';
    this.aadharDocumentUrl = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.aadharImagePath || '';
    this.panDocumentUrl = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.panImagePath || '';
    this.challanUrl = this.user?.ProofOfVending?.__zone_symbol__value?.Tokens?.imageUrl || '';
    this.additionalDocumentUrl = this.user?.AccountInformation?.__zone_symbol__value?.UserInfo?.additionalDocImagePath || 'N/A';
    this.siteOfVending = this.user?.VendorSiteInformationActivity?.__zone_symbol__value?.vendingInfo?.siteOfVending || 'N/A';
    this.yearsOfVending = this.user?.VendorSiteInformationActivity?.__zone_symbol__value?.vendingInfo?.yearsOfVending || 'N/A';
    this.timeOfVending = new Date(this.user?.vendorList?.__zone_symbol__value?.newVendorData?.currentTimeMillis) || null;
    this.selectedVendingType = this.user?.VendorSiteInformationActivity?.__zone_symbol__value?.vendingInfo?.selectedVendingType || 'N/A';
    this.memberOneName = this.user?.FamilyInformationActivity?.membersData[0]?.fullName || '';
    this.memberOneOccupation = this.user?.FamilyInformationActivity?.membersData[0]?.occupation || '';
    this.memberOneAadhar = this.user?.FamilyInformationActivity?.membersData[0]?.aadhar || '';

    this.memberTwoName = this.user?.FamilyInformationActivity?.membersData[1]?.fullName || '';
    this.memberTwoOccupation = this.user?.FamilyInformationActivity?.membersData[1]?.occupation || '';
    this.memberTwoAadhar = this.user?.FamilyInformationActivity?.membersData[1]?.aadhar || '';

    this.accountHolderName = this.user?.AccountInformation?.__zone_symbol__value?.BankDetails?.accountHolderName || 'N/A';
    this.accountNum = this.user?.AccountInformation?.__zone_symbol__value?.BankDetails?.accountNum || 'N/A';
    this.bankName = this.user?.AccountInformation?.__zone_symbol__value?.BankDetails?.bankName || 'N/A';
    this.branch = this.user?.AccountInformation?.__zone_symbol__value?.BankDetails?.branch || 'N/A';
    this.ifscCode = this.user?.AccountInformation?.__zone_symbol__value?.BankDetails?.ifscCode || 'N/A';
  }

  openForm(formName: string): void {
    this.selectedForm = formName;
  }
  
  goVendor() {
    this.router.navigate(['/dashboard']);
  }

  downloadDocument(documentUrl: string, filename: string) {
    const storage = getStorage();
    const documentRef = ref(storage, documentUrl);
    getDownloadURL(documentRef).then((url) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(response => {
        this.saveFile(response, filename);
      });
    }).catch((error) => {
      console.error('Error getting download URL: ', error);
    });
  }

  private saveFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'image/jpeg' }); 
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
