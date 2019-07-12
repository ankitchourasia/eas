import { Injectable } from '@angular/core';
@Injectable()
export class GlobalConstants {   
    public static readonly URL_PREFIX = "/ROOT/backend/";
    public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.114:8080/ROOT/backend/";
    public readonly ROLE_ADMIN = "admin";
    public readonly ROLE_SUPER_ADMIN = "super_admin";
    public readonly DATE_FORMAT = 'dd-MMM-yyyy';
    public readonly FEEDER_TYPES = [{name:'INTER_DIVISION', value:'INTER DIVISION'}, {name:'INTER_ZONE', value:'INTER ZONE'}, {name:'PARENTAL', value:'PARENTAL'}];
    public readonly METER_MAKES = [{name:'GENUS', value:'GENUS'}, {name:'HPL', value:'HPL'}, {name:'OMNI', value:'OMNI'}, {name:'SECURE', value:'SECURE'}, {name:'OTHER', value:'OTHER'}];
 }
