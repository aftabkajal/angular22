import { Component, inject, OnInit, signal } from '@angular/core';
import { IEnquiry } from '../model/enquery.model';
import { HttpClient } from '@angular/common/http';
import { Enquery } from '../services/enquery';

@Component({
  imports: [],
  selector: 'app-enquery-list',
  styleUrl: './enquery-list.css',
  templateUrl: './enquery-list.html',
})
export class EnqueryList implements OnInit {
  enqueryService = inject(Enquery);

  ngOnInit(): void {
    this.getAllEnquiry();
  }
  
  enquryList = signal<IEnquiry[]>([]);

getAllEnquiry() {
    this.enqueryService.getAllEnquries().subscribe({
      next: (res: any) => {
        if (res.result === true) {
          this.enquryList.set(res.data);
        }else {
          alert(res.message || 'Failed to fetch enquiries');
        }
      }
    });
  }

}
