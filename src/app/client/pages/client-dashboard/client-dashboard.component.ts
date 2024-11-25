import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent implements OnInit {
  ads: any[] = [];
  validateForm: FormGroup;
  
  // Pagination properties
  totalElements = 0;
  pageSize = 5;
  pageNumber = 0;
  searchTerm = '';

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    });
    this.getAllAds();
  }

  getAllAds() {
    this.clientService.getAllAds(this.pageNumber, this.pageSize)
      .subscribe(res => {
        this.ads = res.content;
        this.totalElements = res.totalElements;
      });
  }

  searchAdByName() {
    this.searchTerm = this.validateForm.get('service').value;
    this.pageNumber = 0; // Reset to first page on new search
    this.clientService.searchAdByName(this.searchTerm, this.pageNumber, this.pageSize)
      .subscribe(res => {
        this.ads = res.content;
        this.totalElements = res.totalElements;
      });
  }

  onPageChange(event: number) {
    // Adjust page number (ng-zorro pagination is 1-indexed, but our backend is 0-indexed)
    this.pageNumber = event - 1;
    
    if (this.searchTerm) {
      this.clientService.searchAdByName(this.searchTerm, this.pageNumber, this.pageSize)
        .subscribe(res => {
          this.ads = res.content;
        });
    } else {
      this.getAllAds();
    }
  }

  updateImg(img) {
    return "data:image/jpeg;base64," + img;
  }
}