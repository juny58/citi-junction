import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService, UserInterface } from "src/app/services/auth/auth.service"
import { LocalStorageValues } from 'src/app/services/localstorage/localstorage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  user: UserInterface = {
    email: null,
    password: null,
    name: null,
    phone: null,
    role: 'user',
    pushToken: null
  }

  section = "register"
  isLoading = false
  hasRegisterButtonPressed: boolean

  constructor(private authService: AuthService, private alertController: AlertController, private router: Router) { }

  ngOnInit() { }

  validateEmailAddress() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.user.email).toLowerCase());
  }

  registerNow() {
    this.isLoading = true
    this.user.pushToken = this.authService.user.pushToken
    this.authService.createUser(this.user).subscribe(res => {
      localStorage.setItem(LocalStorageValues.userId, res._id)
      this.router.navigate(["/"], { replaceUrl: true })
      this.isLoading = false
      let token = this.authService.user.pushToken
      this.authService.user = res
      this.authService.user.pushToken = token
      this.authService.updateUser({ _id: res._id, pushToken: this.authService.user.pushToken })
        .subscribe(() => { })
    }, err => {
      //console.log(err);
      this.isLoading = false
      this.showAuthErrorAlert({
        header: "Error in registering",
        message: err.error.message
      })
    })
  }

  async showAuthErrorAlert(d) {
    let alert = await this.alertController.create(d)
    alert.present()
  }

  checkRegisterNow() {
    if (!this.user.name || this.user.name.split(' ').length == 1) {
      return true
    }
    if (this.user.name.split(' ')[0].length == 0 || this.user.name.split(' ')[1].length == 0) {
      return true
    }
    if (!this.validateEmailAddress()) {
      return true
    }
    if (!this.user.password) {
      return true
    }
    if (this.user.password.length < 8) {
      return true
    }
    if (!this.user.phone || this.user.phone.length != 10) {
      return true
    }
    return false
  }

  checkLogin() {
    if (!this.user.password) {
      return true
    }
    if (this.user.password.length < 8) {
      return true
    }
    if (!this.validateEmailAddress()) {
      return true
    }
    return false
  }

  login() {
    this.isLoading = true
    this.authService.getUserByEmailAndPassword(this.user.email, this.user.password).subscribe(d => {
      localStorage.setItem(LocalStorageValues.userId, d._id)
      this.router.navigate(["/"], { replaceUrl: true })
      this.isLoading = false
      let token = this.authService.user.pushToken
      this.authService.user = d
      this.authService.user.pushToken = token
      this.authService.updateUser({ _id: d._id, pushToken: this.authService.user.pushToken })
        .subscribe(() => { })
    }, err => {
      //console.log(err);
      this.isLoading = false
      this.showAuthErrorAlert({
        header: "Error in login",
        message: err.error.message
      })
    })
  }

  clickRegister() {
    this.hasRegisterButtonPressed = true
  }

  getIncompleteMessage() {
    if (!this.user.name) {
      return "Name is mandatory"
    }
    if (this.user.name.split(' ').length == 1 || this.user.name.split(' ')[0].length == 0 || this.user.name.split(' ')[1].length == 0) {
      return "Full name required"
    }
    if (!this.validateEmailAddress()) {
      return "Email is not correctly formatted"
    }
    if (!this.user.password) {
      return "Password is mandatory"
    }
    if (this.user.password.length < 8) {
      return "Password length should be at least 8"
    }
    if (!this.user.phone || this.user.phone.length != 10) {
      return "Proper phone number not entered"
    }
    return
  }

}
