import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const environment = {
  localApiRoute1: "http://localhost:8080/api/v1",
  localApiRoute: "/api/v1",
  serverApiRoute: "https://cholietalie.nl/api/v1"
}

export const slideInFromLeftAnimation = trigger('slideInFromLeft', [
  transition('* => *', [ // This transition applies for any change of state
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-100%' }) // Start from the left
    ], { optional: true }),
    group([
      query(':leave', [
        animate('600ms ease-out', style({ left: '100%' })) // Exit to the right
      ], { optional: true }),
      query(':enter', [
        animate('600ms ease-out', style({ left: '0%' })) // Enter from the left
      ], { optional: true })
    ])
  ])
]);

export const slideInFromRightAnimation = trigger('slideInFromRight', [
  transition('* => *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '100%' }) // Start from the right
    ], { optional: true }),
    group([
      query(':leave', [
        animate('600ms ease-out', style({ left: '-100%' })) // Exit to the left
      ], { optional: true }),
      query(':enter', [
        animate('600ms ease-out', style({ left: '0%' })) // Enter from the right
      ], { optional: true })
    ])
  ])
]);

