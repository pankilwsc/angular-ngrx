import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(
        private messageService: MessageService
    ) {}
    showMessage(message: Message) {
        this.messageService.clear();
        this.messageService.add(message);
    }
}