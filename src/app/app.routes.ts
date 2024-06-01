import { Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { ScheduleComponent } from './schedule/schedule.component';

export const routes: Routes = [
    { path: '', redirectTo: 'course-list', pathMatch: 'full' },
    { path: 'course-list', component: CourseListComponent },
    { path: 'schedule', component: ScheduleComponent }
];
