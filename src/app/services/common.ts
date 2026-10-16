import { Service } from '@angular/core';
import { Subject } from 'rxjs';

@Service()
export class Common {

    $onLogin: Subject<void> = new Subject<void>();
}
