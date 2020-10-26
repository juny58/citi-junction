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
  production: true,
  apiPath: apiPath.live,
  currency: '₹',
  algolia: {
    apiKey: "4c79519c2f3b0304cf3673ad00b22700",
    appId: "XBJ5SHF0DL"
  },
  payment: {
    razorPay: razorPay.test
  }
};
