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
                        (this as any)[this.observerVariable] = true;
                    } else {
                        (this as any)[this.observerVariable] = false;
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (this.observer) {
            this.observer.observe(this.el.nativeElement);
        }
    }
}
