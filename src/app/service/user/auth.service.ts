import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';

  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }
  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  Getall(){
    return this.http.get<any>(this.apiurl);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }

  changerPassword(dataUser:any){
    return this.http.put(this.apiurl+'/'+dataUser.id , dataUser);
  }

  // updateUserPasswordByEmail(email: string, newPassword: string) {
  //   // First, fetch the user data using their email
  //   this.http.get(this.apiurl + '?email=' + email).subscribe(
  //     (userData: any[]) => {
  //       if (userData.length > 0) {
  //         // If user with provided email exists, update the password for the first user found
  //         const userId = userData[0].id; // Assuming your user object has an 'id' field

  //         // Now, update the user's password
  //         this.http.put(this.apiurl + '/' + userId, { password: newPassword }).subscribe(
  //           (response) => {
  //             console.log('Password updated successfully for user with email:', email);
  //             // Handle success: password updated
  //           },
  //           (error) => {
  //             console.error('Error updating password:', error);
  //             // Handle error: password update failed
  //           }
  //         );
  //       } else {
  //         console.log('User with email', email, 'not found');
  //         // Handle error: user not found with the provided email
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching user data by email:', error);
  //       // Handle error: unable to fetch user data
  //     }
  //   );
  // }

  
}