import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptGeocoding } from '@demo/shared';
import {} from '@timdoege/nativescript-geocoding';

@Component({
	selector: 'demo-nativescript-geocoding',
	templateUrl: 'nativescript-geocoding.component.html',
})
export class NativescriptGeocodingComponent {
	demoShared: DemoSharedNativescriptGeocoding;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedNativescriptGeocoding();
	}
}
