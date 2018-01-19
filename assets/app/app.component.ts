import { Component } from '@angular/core';
import { MessageService } from './messages/message.service'
import { ErrorService } from './errors/error.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService, ErrorService]
})
export class AppComponent {

} 