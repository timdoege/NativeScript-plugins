import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptGeocodingComponent } from './nativescript-geocoding.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptGeocodingComponent }])],
	declarations: [NativescriptGeocodingComponent],
	schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptGeocodingModule {}
