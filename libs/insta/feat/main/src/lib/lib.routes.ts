import { Route } from '@angular/router';
import { MainShellComponent } from './main-shell.component';
import { TimelineContainerComponent } from '@insta/feat/timeline';
import { ProfileContainerComponent } from '../../../profile/src/lib/profile-container.component';

// /timeline

export const featureMainRoutes: Route[] = [

  { path: '',  component: MainShellComponent, children: [

      { path: 'timeline', component: TimelineContainerComponent },

      { path: 'profile', component: ProfileContainerComponent },

      // { path: 'social', component: SocialContainer },

      { path: '**', redirectTo: 'timeline' }
  ]},
];
