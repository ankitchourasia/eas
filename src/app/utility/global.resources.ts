import { Injectable } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import alert from "sweetalert2";
import $ from 'jQuery';
import { GlobalConstants } from './global.constants';

@Injectable()
export class GlobalResources {

    constructor(private globalConstants: GlobalConstants){

    }

    getUserDetails(){
        return JSON.parse(sessionStorage.getItem('userDetails'));
    }

    handleError(response: Response | any, componentName: string, methodName: string, customErrorMessage?: string) {
        console.error("error inside " + componentName + "-" + methodName, response);
        let alertResponse: any = null;
        try{
            switch (response.status) {
                case 0:{
                    alertResponse = this.errorAlert("Frontend Server error");
                    break;
                }
                case 500: case 501: case 502: case 503:case 504:{
                    alertResponse = this.errorAlert("Backend Server error");
                    break;
                }
                default:{
                    if(customErrorMessage){
                        alertResponse = this.errorAlert(customErrorMessage);
                    }else if(response.error && response.error.errorMessage){
                        alertResponse = this.errorAlert(response.error.errorMessage);
                    }else if(response.error && response.error.message){
                        alertResponse = this.errorAlert(response.error.message);
                    }else{
                        alertResponse = this.errorAlert("Some error occurred. Try again...");
                    }
                }
            }
        }catch(exception){
            console.log(exception);
            alertResponse = this.errorAlert("Exception occurred inside " + methodName + " of " + componentName);
        }
        return alertResponse;
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

    resetValidateInput(ngModelElement: NgModel){
        if(ngModelElement){
            ngModelElement.control.markAsPristine();
            ngModelElement.control.markAsUntouched();
        }
    }

    validateInput(ngModelElement: NgModel){
        if(ngModelElement){
            ngModelElement.control.markAsDirty();
            ngModelElement.control.markAsTouched();
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
        // this.fixBootstrapModal();
        return alert.fire({
            html: "<strong>" + message + "<strong>",
            animation: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            focusConfirm: true,
            buttonsStyling: false,
            confirmButtonText: 'OK',
            confirmButtonClass: 'btn btn-danger',
            keydownListenerCapture: true,
        });
    }

    successAlert(message:string){
        // this.fixBootstrapModal();
        return alert.fire({
            html: "<strong>" + message + "<strong>",
            animation: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            focusConfirm: true,
            buttonsStyling: false,
            confirmButtonText: 'OK',
            confirmButtonClass: 'btn btn-success',
            keydownListenerCapture: true,
        });
    }

    confirmAlert(message:string){
        // this.fixBootstrapModal();
        return alert.fire({
            html: "<strong>" + message + "<strong>",
            animation: true,
            showCancelButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            focusConfirm: true,
            buttonsStyling: false,
            confirmButtonText: 'YES ',
            confirmButtonClass: 'btn btn-success mx-3',
            cancelButtonText: 'NO ',
            cancelButtonClass: 'btn btn-danger',
            keydownListenerCapture: true,
            // reverseButtons: true,
            // background: "black",
            // position: "bottom",
            // backdrop: "linear-gradient(yellow, orange, red, blue)",
        });
      }

      templateAlert(templateRef, options){
        //   this.fixBootstrapModal();
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
            width: options.width,
            keydownListenerCapture: true,
        });
      }

    // call this before showing SweetAlert:
    fixBootstrapModal() {
        var modalNode = document.querySelector('.modal[tabindex="-1"]');
        if (!modalNode) return;
    
        modalNode.removeAttribute('tabindex');
        modalNode.classList.add('swal-fixed');
    }
  
  // call this before hiding SweetAlert (inside done callback):
    restoreBootstrapModal() {
        var modalNode = document.querySelector('.modal.swal-fixed');
        if (!modalNode) return;
    
        modalNode.setAttribute('tabindex', '-1');
        modalNode.classList.remove('swal-fixed');
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

    getCustomDate(receivedDate, days: number = 0, months: number = 0, years: number = 0){
        let date: Date = new Date(receivedDate);
        
        if(!receivedDate || Object.prototype.toString.call(date) !== "[object Date]" || isNaN(date.getTime()) ){
            return; 
        }
        
        date.setFullYear(date.getFullYear() + years);
        date.setMonth(date.getMonth() + months);
        date.setDate(date.getDate() + days);
                
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();

        if(month.length < 2){ month = '0' + month };
        if(day.length < 2){ day = '0' + day }
        
        return [year,month,day].join('-');
    }

    getMonthWithYear(receivedDate){
        let date: Date = new Date(receivedDate);

        if(!receivedDate || Object.prototype.toString.call(date) !== "[object Date]" || isNaN(date.getTime()) ){
            return; 
        }
        
        return this.globalConstants.MONTHS[date.getMonth()] + "-" + date.getFullYear();
    }

    getDateDiffInDays(firstDate, secondDate){
        let date1 = new Date(firstDate);
        let date2 = new Date(secondDate);

        if(!firstDate || Object.prototype.toString.call(date1) !== "[object Date]" || isNaN(date1.getTime()) ){
            return; 
        }

        if(!secondDate || Object.prototype.toString.call(date2) !== "[object Date]" || isNaN(date2.getTime()) ){
            return; 
        }

        //Get 1 day in milliseconds
        let one_day = 1000*60*60*24;

        // Convert both dates to milliseconds
        let firstDate_ms = date1.getTime();
        let secondDate_ms = date2.getTime();

        return Math.round((firstDate_ms -secondDate_ms) / one_day); 
    }


    getPreviousBillMonth(billMonth){
        if(billMonth){
            let values = billMonth.split('-');
            let month = values[0];
            let year = 	parseInt(values[1]);
            let previousMonth;
            let previousYear = year;
            switch (month) {
            case "JAN":
                previousMonth = 'DEC';
                previousYear = previousYear - 1;
                break;
            case "FEB":
                previousMonth = 'JAN';
                break;
            case "MAR":
                previousMonth = 'FEB';
                break;
            case "APR":
                previousMonth = 'MAR';
                break;
            case "MAY":
                previousMonth = 'APR';
                break;
            case "JUN":
                previousMonth = 'MAY';
                break;
            case "JUL":
                previousMonth = 'JUN';
                break;
            case "AUG":
                previousMonth = 'JUL';
                break;
            case "SEP":
                previousMonth = 'AUG';
                break;
            case "OCT":
                previousMonth = 'SEP';
                break;
            case "NOV":
                previousMonth = 'OCT';
                break;
            case "DEC":
                previousMonth = 'NOV';
                break;
            default:
                break;
            }
            return previousMonth.toUpperCase()+"-"+previousYear;
        }else{
            return null;
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

    printElementById(elementId, options?:any){
        if(options){
            if(options.fontSize){
                document.getElementById(elementId).style.fontSize = options.fontSize;
            }
            if(options.textAlign){
                document.getElementById(elementId).style.textAlign = options.textAlign;
            }
        }
        let content = document.getElementById(elementId).outerHTML;
        let w =window.open("","print-screen");
        w.document.write(content);
        w.print();
        w.close();
        // let content = document.getElementById(elementId);
        // let doc = document.implementation.createHTMLDocument("New Document");
        // let element = doc.createElement("table");
        // element.id = elementId;
        // element.innerHTML = content.outerHTML;
        // doc.body.appendChild(element);
        // if(options){
        //     if(options.fontSize){
        //         doc.getElementById(elementId).style.fontSize = options.fontSize;
        //     }
        //     if(options.textAlign){
        //         doc.getElementById(elementId).style.textAlign = options.textAlign;
        //     }
        // }
        // let w =window.open("","print-screen");
        // w.document.write(element.outerHTML);
        // w.print();
        // w.close();
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
        
    downloadFile(fileUrl, params){
        // Add authentication headers in URL
        let url = [fileUrl, $.param(params)].join('?');
        window.location.href = url;
		// window.open(url);
    }

    exportTableToExcel(tableID, fileName?){
        let dataType = 'data:application/vnd.ms-excel';
        fileName = fileName ? fileName : 'file';
        let htmltable = document.getElementById(tableID);
        let tableHTML = htmltable.outerHTML;
        // this.downloadHTML(tableHTML, dataType, fileName, 'xls');
        this.downloadByBlob(tableHTML, dataType, fileName, 'xls');
    }

    downloadHTML(htmlContent, dataType, fileName, extention){
        // let downloadContent = dataType + encodeURIComponent(htmlContent);
        let downloadContent = 'data:' + dataType + ', ' + htmlContent;
        let anchorElement = document.createElement("a");
        document.body.appendChild(anchorElement);
        anchorElement.download = fileName + "." + extention;
        anchorElement.href = downloadContent;
        console.log(anchorElement);
        anchorElement.click();
        anchorElement.remove();
    }

    downloadByBlob(content, dataType, fileName, extention){
        let file = new Blob(['\ufeff', content], {type: dataType});
        let anchorElement = document.createElement("a");
        anchorElement.href = window.URL.createObjectURL(file);
        anchorElement.download = fileName + "." + extention;
        anchorElement.click();
        anchorElement.remove();
    }
}
