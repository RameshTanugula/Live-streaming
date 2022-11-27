import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppserviceService } from '../service/appservice.service';
// import * as images from ''
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public imageUrl: any = [];
  public videoId: any = ''
  banner:any;
  userId: string=''
  constructor(private service: AppserviceService,
     private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.userId=this.route.snapshot.params['userid'];
    window.localStorage.setItem('user_id', this.userId);
    this.getUserImages();
  }
  getUserImages(){
    this.service.getData('get/images/' + this.userId).subscribe((data: any)=>{
      if(data && data.data && data.data.length>0){
        const imgData:any = data.data;
        this.videoId= imgData[0]?.video_id;
        this.banner = imgData.find((im: any)=>im.type==='banner')?.img;
        const slidesData = imgData.filter((im: any)=>im.type !=='banner');
        slidesData.map((sl: any)=>{
          this.imageUrl.push(sl.img);
          return sl;
        });
      }
     })
  }

}
