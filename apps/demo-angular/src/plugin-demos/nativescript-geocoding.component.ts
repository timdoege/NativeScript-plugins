import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptGeocoding } from '@demo/shared';
import { SearchBar } from '@nativescript/core';
import * as geocoding from '@timdoege/nativescript-geocoding';

@Component({
	selector: 'demo-nativescript-geocoding',
	templateUrl: 'nativescript-geocoding.component.html',
})
export class NativescriptGeocodingComponent {
	demoShared: DemoSharedNativescriptGeocoding;
    public searchString = '';
    public location = new geocoding.Location();

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedNativescriptGeocoding();
	}


    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        geocoding.getLocationListFromName(searchBar.text, 5).then(locations => {
            console.log('Found ', locations.length);
            if (locations.length > 0) {
                this.location = locations[0];
            }
        }, function (e) {
            console.log('Error: ' + (e.message || e));
        });
    }

    public onSearchBarClear(args) {
        this.location = new geocoding.Location();
    }

}
