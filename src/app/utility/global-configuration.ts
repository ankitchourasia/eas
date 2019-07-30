import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConfiguration {
  
    public static readonly ROLE_ADMIN = "admin";
    public static readonly ROLE_HTM_ADMIN = "htm_admin";
    public static readonly ROLE_SUPER_ADMIN = "super_admin";
    public static readonly ROLE_FIELD_ADMIN = "field_admin";
    public static readonly URL_PREFIX = "/ROOT/backend/";
    // public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.118:8080/ROOT/backend/";
    public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://localhost/ROOT/backend/";
    
    constructor () {}

}
