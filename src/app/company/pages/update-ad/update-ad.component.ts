import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-ad',
  templateUrl: './update-ad.component.html',
  styleUrl: './update-ad.component.scss'
})
export class UpdateAdComponent {
  adId:any ;
constructor(private companyService:CompanyService,
  private activatedroute:ActivatedRoute)
  {

  }

 ngOnInit(): void {
     this.adId = this.activatedroute.snapshot.params['id'];
    this.getAdById();
  }
  getAdById()

  {
    this.companyService.getAdById(this.adId).subscribe(
      res=>{
        console.log(res);
      }
    )
}
}