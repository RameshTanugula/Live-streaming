import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  userData: any = [];
  shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File | undefined; 
    files: Array<File> | undefined; 
    videoId:string='';
    video_id:any='';
  showForm: boolean = false;
  image!: string;
  constructor(
    public router: Router,
    // private fb: FormBuilder,
      private service: AppserviceService
  ) {
    
    window.localStorage.removeItem("isLoginFromUser");
  }
ngOnInit(): void {
  this.getUserData();
  this.getUserImages();
}
onUpdateVideoId(){
  const data = {videoId: this.video_id, userId: window.localStorage.getItem('user_id')}
  this.service.postData('update/videoid', data).subscribe((data: any)=>{
   this.video_id = '';
    alert('Data updated succesfully');

  })
}
getUserData(){
  this.service.getData('get/users').subscribe((data: any)=>{
    this.userData = data.data;
  })
}
getUserImages(){
  this.service.getData('get/images').subscribe((data: any)=>{
    this.image=data.data[0].img;
   })
}
onClickCell(){

}
onChange(event: any){
  this.file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = () => {
  };

}
onChangeMultiple(event: any){
  this.files = event.target.files;
}
onUpload(){        
      // Store form name as "file" with file data
      if(this.file){ 
        const data: any = {
          user_id: window.localStorage.getItem("user_id"),
       type:'banner'}
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
          data.img = reader.result;
          this.service.postData('upload/images', data).subscribe((data: any)=>{
        this.file = undefined;
            alert('Data updated succesfully');
        })
      };}
      return null;
}
onUploadMultiple(){

  // Create form data
  const formData = new FormData(); 
    
  // Store form name as "file" with file data
  if(this.files && this.files?.length > 0){
    const data: any = {
      user_id: window.localStorage.getItem("user_id"),
       type:'slider'}
    for(let i=0; i< this.files.length; i++){
      const reader = new FileReader();
    reader.readAsDataURL(this.files[i]);
    reader.onload = () => {
        data.img = reader.result;
        this.service.postData('upload/images', data).subscribe((data: any)=>{
          this.files = undefined;
          alert('Data updated succesfully');

      })
    };
  }
  }
  return null;
}
onClickAdd(){
  this.showForm = true;

}
}

