import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Status } from '../services/status';
import { APIResponse } from '../model/common.model';
import { StatusModel } from '../model/status.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-status-master',
  styleUrl: './status-master.css',
  templateUrl: './status-master.html',
})
export class StatusMaster implements OnInit {

  statusForm: FormGroup = new FormGroup({
    statusId: new FormControl(0),
    statusName: new FormControl(''),
    isActive: new FormControl(false)
  });
  statusService = inject(Status);
  statusList = signal<StatusModel[]>([]);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.getAllStatus();
  }

  initializeForm() {
    this.statusForm = new FormGroup({
      statusId: new FormControl(0),
      statusName: new FormControl(''),
      isActive: new FormControl(false)
    });
  }

  onSaveStatus() {
    const statusData = this.statusForm.value;
    this.statusService.createStatus(statusData).subscribe({
      next: (res: APIResponse) => {
        if (res.result === true) {
          alert('Status added successfully');
          this.statusForm.reset({ statusId: 0, statusName: '', isActive: false });
          this.getAllStatus();
        } else {
          alert(res.message || 'Failed to add status');
        }
      },
      error: (err) => {
        console.error('Error occurred while saving status:', err);
        alert('An error occurred while saving the status. Please try again.');
      }
    });
  }

  onUpdateStatus() {
    const statusData = this.statusForm.value;
    this.statusService.updateStatus(statusData).subscribe({
      next: (res: APIResponse) => {
        if (res.result === true) {
          alert('Status updated successfully');
          this.statusForm.reset({ statusId: 0, statusName: '', isActive: false });
          this.getAllStatus();
        } else {
          alert(res.message || 'Failed to update status');
        }
      },
      error: (err) => {
        console.error('Error occurred while updating status:', err);
        alert('An error occurred while updating the status. Please try again.');
      }
    });
  }

  onResetStatus() {
    this.statusForm.reset();
  }

  getAllStatus() {
    this.statusService.getAllStatus().subscribe({
      next: (res: APIResponse) => {
        this.statusList.set(res.data);
      }
    })
  }

  onEditStatus(status: StatusModel) {
    this.statusForm.setValue(status);
  }

  onDeleteStatus(statusId: number) {
    if (confirm('Are you sure you want to delete this status?')) {
      this.statusService.deleteStatus(statusId).subscribe({
        next: (res: APIResponse) => {
          if (res.result === true) {
            alert('Status deleted successfully');
            this.getAllStatus();
          } else {
            alert(res.message || 'Failed to delete status');
          }
        },
        error: (err) => {
          console.error('Error occurred while deleting status:', err);
          alert('An error occurred while deleting the status. Please try again.');
        }
      });
    }
  }

}
