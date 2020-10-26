import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare const RazorpayCheckout

@Injectable({
  providedIn: 'root'
})
export class RazorPayService {

  constructor(private httpClient: HttpClient) { }

  proceedPaymentWithRazorpay(variableOptions: RazorpayVariableOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let staticOptions = {
        image: 'https://www.citijunction.com/assets/cj.png',
        currency: 'INR',
        key: environment.payment.razorPay.key_id,
        name: 'Citi Junction'
      }

      let options = Object.assign(staticOptions, variableOptions)

      var successCallback = (success) => {
        resolve(success)
      }

      var cancelCallback = (error) => {
        reject(error)
      }

      RazorpayCheckout.on('payment.success', successCallback)
      RazorpayCheckout.on('payment.cancel', cancelCallback)
      RazorpayCheckout.open(options)
    })
  }

  veryfyPayment(paymentInfo: RazorPayPaymentResponse) {
    return this.httpClient.post<RazorPayPaymentResponse>(environment.apiPath + "/api/payment/verify-payment", paymentInfo)
  }
}

export interface RazorpayVariableOptions {
  description: string;
  order_id?: string;
  amount: string;
  name?: string;
  image?: string;
  prefill: {
    email: string;
    contact?: string;
    name: string
  }
}

export interface RazorPayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  _id: string
}