import { Injectable } from '@angular/core';
declare const RazorpayCheckout

@Injectable({
  providedIn: 'root'
})
export class RazorPayService {

  constructor() { }

  proceedPaymentWithRazorpay(variableOptions: RazorpayVariableOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      let staticOptions = {
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_sboYrXr4mQ36l5',
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
}

export interface RazorpayVariableOptions {
  description: string;
  order_id?: string;
  amount: string;
  prefill: {
    email: string;
    contact: string;
    name: string
  }
}