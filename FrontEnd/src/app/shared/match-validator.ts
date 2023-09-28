import { FormGroup } from "@angular/forms";

export function MatchingValidation(controlName: string , matchingControlName: string) {
    // Here we will get the control of the form group
    return (fg: FormGroup)=>{
        const control = fg.controls[controlName];
        const matchingControl = fg.controls[matchingControlName];

        if(matchingControl.errors && !matchingControl.errors['notmatched']) {
            return ;
        }
        if(control.value !== matchingControl.value) {
            matchingControl.setErrors({notmatched : true});
        }
        else{
            matchingControl.setErrors(null);
        }
    }
}