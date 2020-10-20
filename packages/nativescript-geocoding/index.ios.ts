

import { Device } from '@nativescript/core';

import {
    LocationBase, LOC_SEARCH_MAX_RESULTS
} from './common';
export * from './common';

export function getLocationFromName(searchString: string): Promise<Location> {
    return new Promise(function(resolve, reject) {
        getIosGeocoder().geocodeAddressStringCompletionHandler(searchString,
            (placemarks, error) => {
                if (error) {
                    let clError = new Error('iOS CLGeocoder error : ' + error.localizedDescription);
                    return reject(clError);
                } else if (placemarks && placemarks.count > 0) {
                    let pm = placemarks[0];
                    resolve(locationFromCLPlacemark(pm));
            }
        });
    });
}

export function getLocationListFromName(searchString: string, maxResCount?: number): Promise<Array<Location>> {
    return new Promise(function(resolve, reject) {
        if (!maxResCount || maxResCount < 0 || maxResCount > LOC_SEARCH_MAX_RESULTS) {
            maxResCount = LOC_SEARCH_MAX_RESULTS;
        }
        getIosGeocoder().geocodeAddressStringCompletionHandler(searchString,
            (placemarks, error) => {
                if (error) {
                    let clError = new Error('iOS CLGeocoder error : ' + error.localizedDescription);
                    return reject(clError);
                } else if (placemarks && placemarks.count > 0) {
                    let maxRes = Math.min(placemarks.count, maxResCount);
                    let res = new Array<Location>();
                    for (let i = 0; i < maxRes; i++) {
                        res.push(locationFromCLPlacemark(placemarks[i]));
                    }
                    resolve(res);
            }
        });
    });
}

function getVersionMaj () {
    return parseInt(Device.osVersion.split(".")[0]);
}


function locationFromCLPlacemark(pm: CLPlacemark): Location {
    let mVer = getVersionMaj();
    let location = new Location();
    location.latitude = pm.location.coordinate.latitude;
    location.longitude = pm.location.coordinate.longitude;
    if (mVer < 11) {
        let addressDictionary = pm.addressDictionary;
        location.subThoroughfare = addressDictionary.objectForKey('SubThoroughfare');
        location.thoroughfare = addressDictionary.objectForKey('Thoroughfare');
        location.locality = addressDictionary.objectForKey('City');
        location.subLocality = addressDictionary.objectForKey('SubLocality');
        location.administrativeArea = addressDictionary.objectForKey('State');
        location.subAdministrativeArea = addressDictionary.objectForKey('SubAdministrativeArea');
        location.postalCode = addressDictionary.objectForKey('ZIP');
        location.country = addressDictionary.objectForKey('Country');
        location.isoCountryCode = addressDictionary.objectForKey('CountryCode');
    }
    else {
        location.name = pm.name;
        location.isoCountryCode = pm.ISOcountryCode;
        location.country = pm.country;
        location.postalCode = pm.postalCode;
        location.administrativeArea = pm.administrativeArea;
        location.subAdministrativeArea = pm.subAdministrativeArea;
        location.locality = pm.locality;
        location.subLocality = pm.subLocality;
        location.thoroughfare = pm.thoroughfare;
        location.subThoroughfare = pm.subThoroughfare;
    }

    location.ios = pm;
    return location;
}
let iosGeocoder: any;

function getIosGeocoder(): CLGeocoder {
    if (!iosGeocoder) {
        iosGeocoder = new CLGeocoder();
    }
    return iosGeocoder;
}

export class Location extends LocationBase {
    public ios: CLPlacemark; // iOS native location
}