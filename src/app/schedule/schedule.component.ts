import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  //for ngModel

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  imports: [CommonModule, FormsModule],
})
export class ScheduleComponent implements OnInit {
  selectedCourses: Course[] = [];
  totalPoints: number = 0;

  constructor() { }
  ngOnInit(): void {
    // Load schedule data from localStorage
    const savedSchedule = localStorage.getItem('userSchedule');
    if (savedSchedule) {
      this.selectedCourses = JSON.parse(savedSchedule);
      this.calculateTotalPoints();
    }
  }

  addToSchedule(course: Course): void {
    this.selectedCourses.push(course);
    this.calculateTotalPoints();
    // Save updated schedule to localStorage
    localStorage.setItem('userSchedule', JSON.stringify(this.selectedCourses));
  }

  removeFromSchedule(course: Course): void {
    const index = this.selectedCourses.indexOf(course);
    if (index !== -1) {
      this.selectedCourses.splice(index, 1);
      this.calculateTotalPoints();
      // Save updated schedule to localStorage
      localStorage.setItem('userSchedule', JSON.stringify(this.selectedCourses));
    }
  }

  private calculateTotalPoints(): void {
    this.totalPoints = this.selectedCourses.reduce((total, course) => total + course.points, 0);
  }
}
