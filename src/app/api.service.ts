import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore'; 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private afs: AngularFirestore) { }

  getSurveyors(): Observable<any[]> {
    return from(
      this.afs.firestore
        .collection('surveyors')
        .get()
        .then((querySnapshot) => {
          const surveyorsData: any[] = [];
          querySnapshot.forEach((doc) => {
            surveyorsData.push({ id: doc.id, ...doc.data() });
          });
          return surveyorsData;
        })
    );
  }


  addCertifiedFieldToVendors(): void {
    this.afs.collection('surveyors').get().subscribe((surveyorQuerySnapshot) => {
      surveyorQuerySnapshot.forEach((surveyorDoc) => {
        const vendorCollectionRef = surveyorDoc.ref.collection('vendors');
        vendorCollectionRef.get().then((vendorQuerySnapshot) => {
          vendorQuerySnapshot.forEach((vendorDoc) => {
            const vendorListCollectionRef = vendorDoc.ref.collection('vendorList');
            vendorListCollectionRef.get().then((vendorListQuerySnapshot) => {
              vendorListQuerySnapshot.forEach((vendorListDoc) => {
                vendorListDoc.ref.set({ Certified: false }, { merge: true });
              });
            });
          });
        });
      });
    });
  }
  updateVendorCertifiedStatus(surveyorId: string, vendorId: string, certified: boolean): Observable<void> {
    const vendorRef = this.afs.collection('surveyors').doc(surveyorId)
                     .collection('vendors').doc(vendorId)
                     .collection('vendorList').doc('newVendorData');

    return from(vendorRef.update({ Certified: certified }));
  }

  getSurveyorsWithVendorInfo(): Observable<any[]> {
    return from(this.afs.collection('surveyors').get()).pipe(
      switchMap((surveyorQuerySnapshot) => {
        const surveyorPromises: Promise<any>[] = [];

        surveyorQuerySnapshot.forEach((surveyorDoc) => {
          const surveyorId = surveyorDoc.id; 
          surveyorPromises.push(
            this.getVendorDetails(surveyorId,surveyorDoc as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>)
          );
        });

        return Promise.all(surveyorPromises).then((results) => {
          return results.flat();
        });
      })
    );
  }

  private getVendorDetails(surveyorId: string,surveyorDoc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>): Promise<any[]> {
    const vendorCollectionRef = surveyorDoc.ref.collection('vendors');
    const vendorPromises: Promise<any>[] = [];
  
    return vendorCollectionRef.get().then((vendorQuerySnapshot) => {
      vendorQuerySnapshot.forEach((vendorDoc) => {
        const vendorId = vendorDoc.id;
        const familyInfoDocRef = vendorDoc.ref.collection('FamilyInformationActivity');
  
        // Fetch data from the FamilyInformationActivity - PreviouslySurveyedMembers document
        const prevSurveyedMembersPromise = familyInfoDocRef.doc('PreviouslySurveyedMembers').get().then((prevSurveyedMembersDoc) => {
          const prevSurveyedMembersData = prevSurveyedMembersDoc.data();
          return { id: prevSurveyedMembersDoc.id, ...prevSurveyedMembersData };
        });
  
        // Fetch data from the FamilyInformationActivity - familyInfo document
        const familyInfoPromise = familyInfoDocRef.doc('familyInfo').get().then((familyInfoDoc) => {
          const familyInfoData = familyInfoDoc.data();
          return { id: familyInfoDoc.id, ...familyInfoData };
        });
  
        // Fetch data from the FamilyInformationActivity - Members collection
        const membersCollectionRef = familyInfoDocRef.doc('familyInfo').collection('Members');
        const membersPromise = membersCollectionRef.get().then((memberQuerySnapshot) => {
          const memberData: any[] = [];
          memberQuerySnapshot.forEach((memberDoc) => {
            memberData.push({ id: memberDoc.id, ...memberDoc.data() });
          });
          return memberData;
        });
  
        // Fetch other vendor details
        const otherDetailsPromise = Promise.resolve({
          id: vendorId,
          surveyorId: surveyorId,
          AccountInformation: this.fetchSubCollectionData(vendorDoc.ref.collection('AccountInformation')),
          AddNewVendor: this.fetchSubCollectionData(vendorDoc.ref.collection('AddNewVendor')),
          ProofOfVending: this.fetchSubCollectionData(vendorDoc.ref.collection('ProofOfVending')),
          UnderTakingActivity: this.fetchSubCollectionData(vendorDoc.ref.collection('UnderTakingActivity')),
          VendorSiteInformationActivity: this.fetchSubCollectionData(vendorDoc.ref.collection('VendorSiteInformationActivity')),
          vendorList:   this.fetchSubCollectionData(vendorDoc.ref.collection('vendorList')),
        });
  
        // Combine promises to resolve all data
        const combinedPromise = Promise.all([prevSurveyedMembersPromise, familyInfoPromise, membersPromise, otherDetailsPromise]).then(([prevSurveyedMembersData, familyInfoData, membersData, otherDetails]) => {
          return { ...otherDetails, FamilyInformationActivity: { prevSurveyedMembersData, familyInfoData, membersData } };
        });
  
        vendorPromises.push(combinedPromise);
      });
  
      return Promise.all(vendorPromises);
    });
  }
  
  
  private fetchSubCollectionData(collectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>): Promise<any> {
    return collectionRef.get().then((subCollectionQuerySnapshot) => {
      const subCollectionData: { [key: string]: any } = {};
      subCollectionQuerySnapshot.forEach((doc) => {
        subCollectionData[doc.id] = doc.data();
      });
      return subCollectionData;
    });
  }

  createSurveyorList(name: string, zone: string, email: string, onboardedVendors: boolean, certifiedVendors: boolean): Observable<any> {
    const surveyorListCollectionRef = this.afs.collection('surveyorslist');
    return from(surveyorListCollectionRef.add({ name, zone, email, onboardedVendors, certifiedVendors }));
  }

  createTvcList(name: string, zone: string, email: string, onboardedVendors: boolean, certifiedVendors: boolean): Observable<any> {
    const tvcListCollectionRef = this.afs.collection('tvclist');
    return from(tvcListCollectionRef.add({ name, zone, email, onboardedVendors, certifiedVendors }));
  }

  getSurveyorList(): any {
    return from(
      this.afs.firestore
        .collection('surveyorslist')
        .get()
        .then((querySnapshot) => {
          const surveyorListData: any[] = [];
          querySnapshot.forEach((doc) => {
            surveyorListData.push({ id: doc.id, ...doc.data() });
          });
          return surveyorListData;
        })
    );
  } 
  getTvcList(): any {
    return from(
      this.afs.firestore
        .collection('tvclist')
        .get()
        .then((querySnapshot) => {
          const tvcListData: any[] = [];
          querySnapshot.forEach((doc) => {
            tvcListData.push({ id: doc.id, ...doc.data() });
          });
          return tvcListData;
        })
    );
  }
}
