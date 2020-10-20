import { Observable, EventData, Page, SearchBar, ObservableArray } from '@nativescript/core';
import { DemoSharedNativescriptGeocoding } from '@demo/shared';
import * as geocoding from '@timdoege/nativescript-geocoding';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptGeocoding {}

export function onNavigatingTo(args) {
    const page: Page = <Page>args.object;
    const vm = new Observable();
    const location = new geocoding.Location();
    vm.set("location", location);
    page.bindingContext = vm;
}
// search for country
export function onSubmit(args) {
    const searchBar: SearchBar = <SearchBar>args.object;
    const searchValue = searchBar.text.toLowerCase();
    const page: Page = <Page>searchBar.page;
    const vm = page.bindingContext;

    const myItems = new ObservableArray();
    if (searchValue !== "") {
        geocoding.getLocationFromName(searchValue).then(loc => {
            vm.set("location", loc);
        }, function (e) {
            console.log("Error: " + (e.message || e));
        });
    }
}
// clear SearchBar text and load ListView initial data
export function onClear(args) {
    const searchBar: SearchBar = <SearchBar>args.object;
    searchBar.text = "";
    searchBar.hint = "Location search string";
    const location = new geocoding.Location();
    const page: Page = <Page>searchBar.page;
    const vm = page.bindingContext;
    vm.set("location", location);
}