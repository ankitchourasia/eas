import { Injectable } from '@angular/core';
@Injectable()
export class GlobalConstants {   
    public static readonly URL_PREFIX = "/ROOT/backend/";
    public readonly ROLE_ADMIN = "admin";
    public readonly ROLE_SUPER_ADMIN = "super_admin";
    public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.114:8080/ROOT/backend/";
 }
