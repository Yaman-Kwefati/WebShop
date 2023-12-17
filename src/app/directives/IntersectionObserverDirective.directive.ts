// intersection-observer.directive.ts
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appIntersectionObserver]',
})
export class IntersectionObserverDirective implements OnInit {
    @Input() observerVariable: string = '';
    private observer: IntersectionObserver | undefined;

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Section is in view
                        (this as any)[this.observerVariable] = true;
                    } else {
                        // Section is out of view
                        (this as any)[this.observerVariable] = false;
                    }
                });
            },
            { threshold: 0.5 } // Adjust the threshold as needed
        );

        if (this.observer) {
            this.observer.observe(this.el.nativeElement);
        }
    }
}
