import { Component } from "@angular/core";
import { MessageService } from './message.service';
import { Message } from './message.model';
import { NgForm } from '@angular/forms'

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
})
export class MessageInputComponent {
    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {

        const message = new Message(form.value.content, 'Maxwell')
        this.messageService.addMessage(message)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        form.resetForm()
    }
}