import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import alert from "sweetalert2";

@Injectable()
export class GlobalResources {

    constructor(){

    }
    
    setPristine(element : NgForm){
        if(element){
            element.form.markAsPristine();
        }
    }

    setUntouched(element : NgForm){
        if(element){
            element.form.markAsUntouched();
        }
    }

    updateValueAndValidity(element : NgForm){
        if(element){
            element.form.updateValueAndValidity();
        }
    }

    resetValidateForm(ngForm:NgForm){
        this.setPristine(ngForm);
        this.setUntouched(ngForm);
        this.updateValueAndValidity(ngForm);
    }

    validateForm(ngForm: NgForm): boolean{
        if(ngForm){
            if(ngForm.invalid){
                Object.keys(ngForm.controls).forEach(control => {
                ngForm.form.get(control).markAsDirty();
                ngForm.form.get(control).markAsTouched();
                });
                return false;
            }else{
                return true;
            }
        }else{
            console.log("form received as null.");
            return false;
        }
    }

    errorAlert( message:string){
        return alert.fire({
            html: message,
            animation: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            focusConfirm: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-danger',
            // confirmButtonColor: "#d9534f",
            confirmButtonText: 'OK',
        });
    }

    successAlert(message:string){
        return alert.fire({
            html: message,
            animation: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            focusConfirm: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            // confirmButtonColor: "#5cb85c",
            confirmButtonText: 'OK',
        });
    }

    confirmAlert(message:string){
        return alert.fire({
            html: message,
            animation: true,
            showCancelButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            focusConfirm: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success mx-sm-3',
            cancelButtonClass: 'btn btn-danger',
            // confirmButtonColor: "#5cb85c",
            // cancelButtonColor: '#d33',
            confirmButtonText: 'YES ',
            cancelButtonText: 'NO ',
        });
      }

    makeDateAsDD_MM_YYYY(inputDate) {
        let day: any;
        let month: any;
        let date = new Date(inputDate);
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        if(dd < 10){ day ='0'+ dd; }
        else{ day = dd; } 
        if(mm < 10){ month ='0'+ mm; }
        else{ month = mm; }
        
        let year = date.getFullYear();
        console.log(day + "-" + month + "-" + year);
        return (day + "-" + month + "-" + year);
    };

    getDateFromDatetimestamp(dateWithTimeStamp){
    // return  dateWithTimeStamp.substring(0, 10);
    
        let mm : any; let dd : any;
        let day = new Date(dateWithTimeStamp).getDate();
        let month = new Date(dateWithTimeStamp).getMonth() + 1;
        let year = new Date(dateWithTimeStamp).getFullYear();
        if(day < 10){ dd ='0'+ day; }
        else{ dd = day; } 
        if(month < 10){ mm ='0'+ month; }
        else{ mm = month; }
    
        return (year + "-" + mm + "-" + dd);
    }

    getUserDetails(){
        return JSON.parse(sessionStorage.getItem('userDetails'));
    }

    getNextBillMonth = function(billMonth){
        let values = billMonth.split('-');
        let month = values[0];
        let year = 	parseInt(values[1]);
        let nextMonth;
        let nextYear = year;
        switch (month) {
        case "DEC":
            nextMonth = 'JAN';
            nextYear = nextYear + 1;
            break;
        case "JAN":
            nextMonth = 'FEB';
            break;
        case "FEB":
            nextMonth = 'MAR';
            break;
        case "MAR":
            nextMonth = 'APR';
            break;
        case "APR":
            nextMonth = 'MAY';
            break;
        case "MAY":
            nextMonth = 'JUN';
            break;
        case "JUN":
            nextMonth = 'JUL';
            break;
        case "JUL":
            nextMonth = 'AUG';
            break;
        case "AUG":
            nextMonth = 'SEP';
            break;
        case "SEP":
            nextMonth = 'OCT';
            break;
        case "OCT":
            nextMonth = 'NOV';
            break;
        case "NOV":
            nextMonth = 'DEC';
            break;
        default:
            break;
        }
        return nextMonth.toUpperCase()+"-"+nextYear;
    }
}
