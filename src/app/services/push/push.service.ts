import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AuthService } from '../auth/auth.service';
import { RouterService } from '../router/router.service';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  options: PushOptions = {
    android: {
      senderID: "649469225509"
    },
    ios: {
      alert: 'true',
      badge: 'true'
    }
  }

  pushObject: PushObject

  constructor(private push: Push, private authService: AuthService, private routerService: RouterService) { }

  initializePush() {

    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          this.pushObject = this.push.init(this.options);
          this.pushObject.on('notification').subscribe((notification: any) => {
            //alert(JSON.stringify(notification))
            if (notification.additionalData.url) {
              this.routerService.doFirstRouting(notification.additionalData.url)
            }
          });
          this.pushObject.on('registration').subscribe((registration: any) => {
            this.authService.user.pushToken = registration.registrationId
            if (this.authService.user._id) {
              this.authService.updateUser({ pushToken: registration.registrationId, _id: this.authService.user._id }).subscribe(() => { })
            }
          });

          this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
        }

      })
      .catch(() => { })

  }
}