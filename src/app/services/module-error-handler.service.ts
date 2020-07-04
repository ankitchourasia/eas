import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ModuleErrorHandler implements ErrorHandler {
  
  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    if (chunkFailedMessage.test(error)) {
      window.location.reload();
    }
  }
}