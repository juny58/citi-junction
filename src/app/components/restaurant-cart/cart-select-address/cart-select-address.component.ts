import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google

@Component({
  selector: 'app-cart-select-address',
  templateUrl: './cart-select-address.component.html',
  styleUrls: ['./cart-select-address.component.scss'],
})
export class CartSelectAddressComponent implements OnInit {

  @ViewChild('map', { read: ElementRef, static: true }) mapRef: ElementRef
  @Output() selectedAddress: EventEmitter<EmittingAddress> = new EventEmitter()
  @Input() restaurantCoordinates: any

  address: RestaurantAddress = {
    details: null,
    coordinates: {
      lat: null,
      long: null
    }
  }

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.drawMarker()
  }

  async drawMarker() {
    let position: any = await this.getCurrentPosition()
    // console.log(...position)
    this.address.coordinates = {
      lat: position[0],
      long: position[1]
    }
    var myLatlng = new google.maps.LatLng(...position);
    var mapOptions = {
      zoom: 15,
      center: myLatlng
    }
    var map = new google.maps.Map(this.mapRef.nativeElement, mapOptions);
    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable: true,
      title: "Set Restaurant Location"
    });

    this.setAddress(myLatlng)

    marker.addListener('dragend', () => {
      // console.log(marker.getPosition())
      this.address.coordinates = {
        lat: marker.getPosition().lat(),
        long: marker.getPosition().lng()
      }

      this.setAddress(new google.maps.LatLng(this.address.coordinates.lat, this.address.coordinates.long))
    })
  }

  setAddress(myLatlng) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': myLatlng }, (results, status) => {
      //console.log(results)
      this.address.details = results[0].formatted_address
      this.getDistance()
    });
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((position) => {
        let pos = [position.coords.latitude, position.coords.longitude]
        resolve(pos)
      }).catch(() => {
        alert("You can not order without permission for location.")
      })
    })
  }

  getDistance() {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(this.address.coordinates.lat, this.address.coordinates.long)],
        destinations: [new google.maps.LatLng(this.restaurantCoordinates.lat, this.restaurantCoordinates.long)],
        travelMode: 'DRIVING'
      }, (d) => {
        //console.log(d)
        let obj = Object.assign(this.address, { distanceInKm: d.rows[0].elements[0].distance.value / 1000, text: d.rows[0].elements[0].distance.text })
        this.selectedAddress.emit(obj)
        //console.log(obj)
      });
  }

}

export interface RestaurantAddress {
  details: string;
  coordinates: {
    lat: string;
    long: string
  }
}

export interface EmittingAddress extends RestaurantAddress {
  distanceInKm: number;
  text: string
}