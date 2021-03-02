import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { AlertComponent } from './alert/alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        AlertComponent,
        PlaceholderDirective,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        AlertComponent,
        PlaceholderDirective
    ]
})

export class SharedModule {}