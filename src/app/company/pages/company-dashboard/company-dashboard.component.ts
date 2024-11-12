import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { error } from 'console';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.scss'
})

export class CompanyDashboardComponent {
  bookings:any;
  constructor(private companyService: CompanyService,
    private notification :NzNotificationService
  ) {}

ngOnInit()
{
  this.getAllAdBookings();
}
getAllAdBookings(){
  this.companyService.getAllAdBookings().subscribe(res=>{
    console.log(res);
    this.bookings = res;
  })
}

changeBookingStatus(bookingId:number, status:string)
{
this.companyService.changedBookingStatus(bookingId,status).subscribe(res=>{
  this.notification.success(
'SUCCESS',
`Booking status changed succesfully`,
{nzDuration:5000}
  );
  this.getAllAdBookings();
},error=>{
  this.notification.error(
    'ERROR',
    `${error.message}`,
    {nzDuration:5000}
  )
})
}



}
