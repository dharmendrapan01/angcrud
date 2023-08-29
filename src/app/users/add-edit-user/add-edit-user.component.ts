import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  uid:number = 0;
  img_local_url = 'http://localhost/angularapi/profile/';
  img_url:any = this.img_local_url+'person.png';
  add_user!:FormGroup;
  selected_img:any;

  constructor(
    private fb : FormBuilder,
    private api : ApiService,
    private router : Router,
    private url : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.uid = this.url.snapshot.params['id'];
    if(this.uid) {
      this.getUserById(this.uid);
    }

    this.add_user = this.fb.group({
      user_id : [''],
      user_name : ['', Validators.required],
      user_email : ['', Validators.required],
      user_password : ['', Validators.required],
    })
  }

  // save form without image
  // add_user = this.fb.group({
  //   user_id : [''],
  //   user_name : ['', Validators.required],
  //   user_email : ['', Validators.required],
  //   user_password : ['', Validators.required],
  // })

  getUserById(uid:any) {
    this.api.getSingleUser(this.uid).subscribe((rese:any) => {
        this.add_user.patchValue({
          user_id : rese.user_id,
          user_name : rese.user_name,
          user_email : rese.user_email,
          user_password : rese.user_password
        });
        this.img_url = (rese['user_photo']) ? this.img_local_url+rese['user_photo'] : this.img_local_url+'person.png';
        console.log(rese);
      }
    )
  }

  // save form with image
  onSave() {
    // console.log(this.add_user.get('user_name')?.value);
    const formData = new FormData();
    formData.append('user_name', this.add_user.get('user_name')?.value)
    formData.append('user_email', this.add_user.get('user_email')?.value)
    formData.append('user_password', this.add_user.get('user_password')?.value)
    formData.append('photo', this.selected_img)
    this.api.postUser(formData).subscribe(
      (res:any) => {
        this.add_user.reset();
        this.router.navigate(['/view_user']);
      }
    )
  }

  // save form without image
  // onSave() {
  //   this.api.postUser(this.add_user.value).subscribe(
  //     (res:any) => {
  //       this.add_user.reset();
  //       this.router.navigate(['/view_user']);
  //     }
  //   )
  // }

  updateUser() {
    console.log(this.add_user.value);
    this.api.updateUserData(this.add_user.value).subscribe(
    (res:any) => {
      alert('Updated Successfully');
      this.router.navigate(['/view_user']);
    })
  }

  reset() {
    this.add_user.reset();
  }

  onImageChange(file:any) {
    if(file[0].length === 0){
      return
    }
    this.selected_img = file[0];
    let reader = new FileReader();
    reader.onload = () => {
      this.img_url = reader.result;
    }
    reader.readAsDataURL(file[0]);
  }
}
