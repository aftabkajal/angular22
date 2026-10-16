import { Service, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusModel } from '../model/status.model';
import { APIResponse } from '../model/common.model';
import { Observable } from 'rxjs';

@Injectable( {
    providedIn: 'root'
})

export class Status {
    http = inject(HttpClient);

    getAllStatus() {
        return this.http.get<APIResponse>('https://api.freeprojectapi.com/api/Enquiry/get-statuses');
    }

    createStatus(status: StatusModel): Observable<APIResponse> {
        return this.http.post<APIResponse>('https://api.freeprojectapi.com/api/Enquiry/create-status', status);
    }

    updateStatus(status: StatusModel): Observable<APIResponse> {
        return this.http.put<APIResponse>(`https://api.freeprojectapi.com/api/Enquiry/update-status/${status.statusId}`, status);
    }

    deleteStatus(statusId: number): Observable<APIResponse> {
        return this.http.delete<APIResponse>(`https://api.freeprojectapi.com/api/Enquiry/delete-status/${statusId}`);
    }
}
