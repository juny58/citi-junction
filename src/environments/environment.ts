// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let razorPay = {
  live: {
    key_id: "rzp_live_ZcUcaAhrHl3AFv"
  },
  test: {
    key_id: "rzp_test_sboYrXr4mQ36l5"
  }
}

let apiPath = {
  live: "https://cjadmin.firebaseapp.com",
  local: "http://localhost:5000"
}

export const environment = {
  production: false,
  apiPath: apiPath.local,
  currency: '₹',
  algolia: {
    apiKey: "4c79519c2f3b0304cf3673ad00b22700",
    appId: "XBJ5SHF0DL"
  },
  payment: {
    razorPay: razorPay.test
  }
};
