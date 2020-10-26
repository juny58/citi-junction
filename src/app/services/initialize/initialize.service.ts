import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  initializeParams: InitializeProperties
  currentAppVersion: string

  constructor(private httpClient: HttpClient, private appVersion: AppVersion, private alertController: AlertController) {
    this.getInitializingParams()
  }

  getInitializingParams() {
    this.httpClient.get<InitializeProperties>(environment.apiPath + "/api/auth/initialize").subscribe(d => {
      this.initializeParams = d
      // console.log(d)
      this.appVersion.getVersionCode()
        .then(res => {
          if (Number(res) < d.appVersion) {
            this.askForUpdate()
          }
        })
        .catch(err => { })
    })
  }

  getAppVersion() {
    this.appVersion.getVersionNumber()
      .then(d => this.currentAppVersion = d)
      .catch(err => { })
  }

  async askForUpdate() {
    let alert = await this.alertController.create({
      header: "Update your app.",
      message: "Your app has an older version. It needs to update.",
      buttons: [
        {
          text: "Update",
          handler: () => {
            window.open("https://www.citijunction.com/android")
          },
          cssClass: "red-alert-btn"
        }
      ]
    })
    alert.present()
  }

}

export interface InitializeProperties {
  restaurant?: {
    delivery?: {
      costPerKm?: number;
      freeAbove?: number;
      allowedDistance?: number;
      deliveryAgentFeePerKm?: number
    }
  },
  appVersion: number
}