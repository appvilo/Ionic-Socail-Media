import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the CreateSchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-school',
  templateUrl: 'create-school.html',
})
export class CreateSchoolPage {

  loginData = { title:'',phone:'',email:'',location:'',text:'',weblink:'',industry:'' };
  url:string;
  data: Observable<any>;
  dev = [];
  devs = {};
  user_id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient,private databaseProvider:DatabaseProvider) {
    this.databaseProvider.getUsers().then(data=>{
      this.devs = data;

    //  alert( data);
 
      if(data[0]['user_id']!=null){

        this.user_id = data[0]['user_id'];

      }else{
       
    
       
      }
    }).catch();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSchoolPage');
  }

  save(){

    if(this.loginData.title.length > 0  && this.loginData.text.length > 0 ){

  
      this.url = "http://mekooshar.appvilo.com/api/create_school.php";
      let postData = new FormData();
      postData.append('user_id',this.user_id);
      postData.append('text',this.loginData.title);
      postData.append('location',this.loginData.location);
      postData.append('image',"default-user.png");
      postData.append('description',this.loginData.text);
    
      this.data = this.http.post(this.url,postData);
  
      this.data.subscribe(data =>{
        this.navCtrl.pop();
      });

    }

  }


}
