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

    getUserDetails(){
        return JSON.parse(sessionStorage.getItem('userDetails'));
    }
}
