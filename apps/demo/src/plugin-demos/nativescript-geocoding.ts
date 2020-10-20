import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptGeocoding } from '@demo/shared';
import {} from '@timdoege/nativescript-geocoding';

export function navigatingTo(args: EventData) {
	const page = <Page>args.object;
	page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptGeocoding {}
