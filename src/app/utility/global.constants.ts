import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants {   
    // public static readonly URL_PREFIX = "/ROOT/backend/";
    // public static readonly URL_PREFIX_FOR_FILE_EXPORT = "http://10.98.4.114:8080/ROOT/backend/";
    public readonly DATE_FORMAT = 'dd-MMM-yyyy';
    public readonly YEARS = this.getYearList();
    public readonly MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    public readonly FEEDER_TYPES = [{name:'INTER_DIVISION', value:'INTER DIVISION'}, {name:'INTER_ZONE', value:'INTER ZONE'}, {name:'PARENTAL', value:'PARENTAL'}];
    public readonly METER_MAKES = [{name:'GENUS', value:'GENUS'}, {name:'HPL', value:'HPL'}, {name:'OMNI', value:'OMNI'}, {name:'SECURE', value:'SECURE'}, {name:'MPE', value:'MPE'}, {name:'OTHER', value:'OTHER'}];
    public readonly STATUS_ACTIVE = "ACTIVE";
    public readonly STATUS_INACTIVE = "INACTIVE";
    public readonly FEEDER_TYPE_PARENTAL = "PARENTAL";
    public readonly FEEDER_TYPE_INTER_ZONE = "INTER_ZONE";
    public readonly FEEDER_TYPE_INTER_DIVISION = "INTER_DIVISION";

    public static readonly CALCULATION_ROUNDING_SCALE: number = 3;
    
    constructor(){ }

    getYearList(){
        let years = [];  
        let year = 2016;
        while(year <= 2050){
           years.push(year++);
        }
        return years;
    }
 }
