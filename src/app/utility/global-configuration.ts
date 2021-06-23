import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfiguration {
  
    public static readonly ROLE_ADMIN = "ADMIN";
    public static readonly ROLE_HTM_ADMIN = "HTM_ADMIN";
    public static readonly ROLE_SUPER_ADMIN = "SUPER_ADMIN";
    public static readonly ROLE_FIELD_ADMIN = "FIELD_ADMIN";
    public static readonly ROLE_REPORT_ADMIN = "REPORT_ADMIN";
    public static readonly ROLE_TOWN_ADMIN = "TOWN_ADMIN";
    public static readonly URL_PREFIX = "/eas/backend/";
    // public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.118:8080/ROOT/backend/";
    // public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.114:8080/eas/backend/";
    //File Export for production
    public static readonly URL_PREFIX_FOR_FILE_EXPORT = "/eas/backend/";
    
    constructor () {}

}
