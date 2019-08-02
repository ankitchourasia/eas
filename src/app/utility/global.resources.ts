import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import alert from "sweetalert2";
import $ from 'jQuery';

@Injectable()
export class GlobalResources {

    constructor(){

    }

    getUserDetails(){
        return JSON.parse(sessionStorage.getItem('userDetails'));
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
        console.log("inside resetValidateForm", ngForm);
        this.setPristine(ngForm);
        this.setUntouched(ngForm);
        this.updateValueAndValidity(ngForm);
    }

    validateForm(ngForm: NgForm): boolean{
        console.log("inside validateForm", ngForm);
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
            html: "<strong>" + message + "<strong>",
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
            html: "<strong>" + message + "<strong>",
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
            html: "<strong>" + message + "<strong>",
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

      templateAlert(templateRef, options){
        return alert.fire({
            title: options.title,
            html: "<hr>" + templateRef.innerHTML + "<hr>",
            animation: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            focusConfirm: true,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success',
            confirmButtonText: 'OK',
            customClass:{
                // content: "text-left"
            },
            width: options.width
        });
      }

    makeDateAsDD_MM_YYYY(inputDate) {
        if(inputDate){
            let dd: any;
            let mm: any;
            let date = new Date(inputDate);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            if(day < 10){ dd ='0'+ day; }
            else{ dd = day; } 
            if(month < 10){ mm ='0'+ month; }
            else{ mm = month; }
            
            let year = date.getFullYear();
            console.log(dd + "-" + mm + "-" + year);
            return (dd + "-" + mm + "-" + year);
        }else{
            return inputDate;
        }
        
    };

    getDateFromDatetimestamp(dateWithTimeStamp){
    // return  dateWithTimeStamp.substring(0, 10);
        if(dateWithTimeStamp){
            let mm : any; let dd : any;
            let day = new Date(dateWithTimeStamp).getDate();
            let month = new Date(dateWithTimeStamp).getMonth() + 1;
            let year = new Date(dateWithTimeStamp).getFullYear();
            if(day < 10){ dd ='0'+ day; }
            else{ dd = day; } 
            if(month < 10){ mm ='0'+ month; }
            else{ mm = month; }
        
            return (year + "-" + mm + "-" + dd);
        }else{
            return dateWithTimeStamp;
        }
        
    }

    getNextBillMonth(billMonth){
        if(billMonth){
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
        }else{
            return null;
        }
    }

    getYearList(){
        let years = [];  
        let year = 2016;
        while(year <= 2050){
           years.push(year++);
        }
        return years;
    }
    
    downloadFile(fileUrl, params){
        // Add authentication headers in URL
        var url = [fileUrl, $.param(params)].join('?');
        window.location.href = url;
		// window.open(url);
    }
    
    printElementById(elementId){
        let w =window.open();
        let content = document.getElementById(elementId).outerHTML;
        w.document.write(content);
        w.print();
        w.close();
    }

    printByElementId(elementId) {
        let domClone = document.getElementById(elementId).cloneNode(true);
        let printSection = document.getElementById("printSection");
        if (!printSection) {
            printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        }
        printSection.innerHTML = "";
        printSection.appendChild(domClone);
        window.print();
    }
}
