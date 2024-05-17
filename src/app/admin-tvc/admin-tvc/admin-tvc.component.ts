import { Component, OnInit, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-admin-tvc',
  templateUrl: './admin-tvc.component.html',
  styleUrls: ['./admin-tvc.component.scss']
})
export class AdminTvcComponent implements OnInit {
  closeResult = '';
  isLoadingSurveyors: boolean= true;
  constructor(private api: ApiService, private modalService: NgbModal) { }
  // isLoadingSurveyors: boolean = true;
  surveyorList: any[] = [];
  tvcListData: any[] = [];
  name: string = '';
  zone: string = '';
  email: string = '';
  unverifiedVendors: boolean = true;
  certifiedVendors: boolean = true;
  ngOnInit(): void {
    this.getTvcData();
  }
  getTvcData() {

    this.api.getTvcList().subscribe(
      (res: any) => {
        this.tvcListData = res;
         console.log(this.tvcListData);
        this.isLoadingSurveyors = false;
      },
      (error: any) => {
        console.error('Error getting surveyor list:', error);
      }
    );
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  onSaveTvc() {
     this.addTvcToList(this.name, this.zone,this.email,this.unverifiedVendors, this.certifiedVendors);
     this.getTvcData();
    this.modalService.dismissAll();
  }
  clearForm() {
    this.name = '';
    this.zone = '';
    this.email ='';
    this.unverifiedVendors = false;
    this.certifiedVendors = false;
  }
  addTvcToList(name: string, zone: string,email: string, unverifiedVendors: boolean, certifiedVendors: boolean) {
    this.api.createTvcList(name,zone,email,unverifiedVendors,certifiedVendors).subscribe(
      (result) => {
        console.log('tvc added successfully:', result);
        this.clearForm();
      },
      (error) => {
        console.error('Error adding tvc:', error);
      }
    );
  }
}
