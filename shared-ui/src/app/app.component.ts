import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertComponent } from './shared/alert/alert/alert.component';
import { ErrorHandlingService } from './shared/error-handling.service';
import { PlaceholderDirective } from './shared/placeholder.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private errSub: Subscription;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private errSrv: ErrorHandlingService) {}
  
  ngOnInit() {
    this.errSub = this.errSrv.error.subscribe(
      (message: string) => {
        this.showErrorAlert(message);
      }
    );
  }

  showErrorAlert(errorMessage?: string) {
    const message = errorMessage ?? 'An Unknown Error Occured!';
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
      );
      const hostViewContainerRef = this.alertHost.vcRef;
      hostViewContainerRef.clear();
      
      const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
      
      componentRef.instance.message = message;
      this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      });
    }

    emitError() {
      this.errSrv.error.next('ERROR from BUTTON')
    }

    ngOnDestroy() {
      this.errSub.unsubscribe();
    }
  }
  