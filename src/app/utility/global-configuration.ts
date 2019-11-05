import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfiguration {
  
    public static readonly ROLE_ADMIN = "ADMIN";
    public static readonly ROLE_HTM_ADMIN = "HTM_ADMIN";
    public static readonly ROLE_SUPER_ADMIN = "SUPER_ADMIN";
    public static readonly ROLE_FIELD_ADMIN = "FIELD_ADMIN";
    public static readonly URL_PREFIX = "/ROOT/backend/";
    // public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.118:8080/ROOT/backend/";
    public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.114:8080/ROOT/backend/";
    
    constructor () {}

}
