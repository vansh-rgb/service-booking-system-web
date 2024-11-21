import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../basic/services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"

export interface PaginatedResponse<T> {
   content: T[];
   totalPages: number;
   totalElements: number;
   pageNumber: number;
   pageSize: number;
}

@Injectable({
   providedIn: 'root'
})
export class ClientService {

   constructor(private http: HttpClient) { }

   getAllAds(page: number = 1, size: number = 1): Observable<PaginatedResponse<any>> {
      const params = new HttpParams()
         .set('page', page.toString())
         .set('size', size.toString());

      return this.http.get<PaginatedResponse<any>>(BASIC_URL + `api/client/ads`, {
         headers: this.createAuthorizationHeader(),
         params: params
      });
   }

   searchAdByName(name: string, page: number = 0, size: number = 10): Observable<PaginatedResponse<any>> {
      const params = new HttpParams()
         .set('page', page.toString())
         .set('size', size.toString());

      return this.http.get<PaginatedResponse<any>>(BASIC_URL + `api/client/search/${name}`, {
         headers: this.createAuthorizationHeader(),
         params: params
      });
   }

   // Other methods remain the same
   getAdDetailsByAdId(adId: any): Observable<any> {
      return this.http.get(BASIC_URL + `api/client/ad/${adId}`,
         {
            headers: this.createAuthorizationHeader()
         })
   }

   bookService(bookDTO: any): Observable<any> {
      return this.http.post(BASIC_URL + `api/client/book-service`, bookDTO, {
         headers: this.createAuthorizationHeader()
      })
   }

   getMyBookings(): Observable<any> {
      const userId = UserStorageService.getUserId();
      return this.http.get(BASIC_URL + `api/client/my-bookings/${userId}`, {
         headers: this.createAuthorizationHeader()
      })
   }

   giveReview(reviewDTO: any): Observable<any> {
      return this.http.post(BASIC_URL + `api/client/review`, reviewDTO, {
         headers: this.createAuthorizationHeader()
      })
   }

   createAuthorizationHeader(): HttpHeaders {
      let authHeaders: HttpHeaders = new HttpHeaders();
      return authHeaders.set(
         'Authorization',
         'Bearer ' + UserStorageService.getToken()
      )
   }
}