import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Enquery } from '../services/enquery';
import { CategoryMaster } from '../category-master/category-master';
import { Status } from '../services/status';

@Component({
  imports: [FormField],
  selector: 'app-new-enquery',
  styleUrl: './new-enquery.css',
  templateUrl: './new-enquery.html',
})
export class NewEnquery implements OnInit {

  ngOnInit(): void {
    this.loadCategories();
    this.loadStatusList();
  }
  newEnquiry = signal({
    enquiryId: 0,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
    categoryId: '',
    statusId: '',
    enquiryType: '',
    isConverted: false,
    enquiryDate: new Date(),
    followUpDate: new Date(),
    feedback: '',
  });

  enquiryForm = form(this.newEnquiry, (path) => {
    required(path.customerName);
    required(path.customerEmail);
  });
  enqueryService = inject(Enquery);
  statusService = inject(Status);
  categoryList = signal<any[]>([]);
  statusList = signal<any[]>([]);

  saveEnquery() {
    const enquiryData = this.enquiryForm().value;
    this.enqueryService.saveEnquery(enquiryData).subscribe({
      next: (response: any) => {
        if (response && response.result == true) {
          alert('Enquiry saved successfully:' + response.message);
          // Reset the form after successful submission
          this.enquiryForm().reset();
        } else {
          alert('Failed to save enquiry:' + response.message);
        }
      },
      error: (error: any) => {
        alert('Error saving enquiry:' + error.message);
      },
    }
    );
  }

  loadCategories() {
    this.enqueryService.getAllcategories().subscribe({
      next: (response: any) => {
        if (response && response.result == true) {
          this.categoryList.set(response.data);
        } else {
          alert('Failed to load categories:' + response.message);
        }
      },
      error: (error: any) => {
        alert('Error loading categories:' + error.message);
      },
    });
  }

  loadStatusList() {
    this.statusService.getAllStatus().subscribe({
      next: (response: any) => {
        if (response && response.result == true) {
          this.statusList.set(response.data);
        } else {
          alert('Failed to load status list:' + response.message);
        }
      },
      error: (error: any) => {
        alert('Error loading status list:' + error.message);
      }
    });
  }
}
