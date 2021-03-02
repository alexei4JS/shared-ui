import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlingService {
    error = new Subject<string>();

    constructor() {}
}