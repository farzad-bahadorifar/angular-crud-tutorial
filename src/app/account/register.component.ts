import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AccountService } from "@app/_services";
import { first } from "rxjs";

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {

    form!: FormGroup;
    loading = false;
    submitted = false;
    error?: string;

    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {
        if (this.accountService.userValue) {
            this.router.navigate(['/'])
        }
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() {return this.form.controls;}

    onSubmit() {
        this.submitted = true;

        this.error = '';

        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
                this.router.navigate(['/account/login']), {queryParams: {registered: true}}
            }, 
            error: error => {
                this.error = error;
                this.loading = false;
            }
        });
    }

}