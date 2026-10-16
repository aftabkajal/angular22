import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Enquery {
  http = inject(HttpClient);


  saveEnquery(data: any) {
    return this.http.post('https://api.freeprojectapi.com/api/Enquiry/create-enquiry', data);
  }

  getAllcategories() {
    return this.http.get('https://api.freeprojectapi.com/api/Enquiry/get-categories');
  }

  getAllEnquries() {
    return this.http.get('https://api.freeprojectapi.com/api/Enquiry/get-enquiries');
  }
}
