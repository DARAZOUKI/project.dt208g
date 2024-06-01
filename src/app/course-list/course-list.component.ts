import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  //for ngModel

@Component({
  selector: 'app-course-list',
  standalone: true,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchTerm: string = '';
  selectedSubject: string = 'all';
  resultCount: number = 0;
  totalCourses: number = 0;
  selectedCourses: Course[] = [];
  subjects: string[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
      this.filteredCourses = [...this.courses];
      this.subjects = this.getUniqueSubjects();
      this.totalCourses = this.courses.length;

      // Load user's schedule from localStorage
      const userSchedule = localStorage.getItem('userSchedule');
      if (userSchedule) {
        this.selectedCourses = JSON.parse(userSchedule);
      }
    });
  }

  sortData(key: string): void {
    this.filteredCourses.sort((a: any, b: any) => (a[key] > b[key] ? 1 : -1));
  }

  filterCourses(): void {
    this.resultCount = this.filteredCourses.length;
  }

  filterBySubject(subject: string): void {
    this.selectedSubject = subject;
    this.filterCourses();
  }

  filterByTerm(): void {
    this.filteredCourses = this.courses.filter(course =>
      course.courseCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      course.courseName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    if (this.selectedSubject !== 'all') {
      this.filteredCourses = this.filteredCourses.filter(course =>
        course.subject.toLowerCase() === this.selectedSubject.toLowerCase()
      );
    }
    this.filterCourses();
  }

  addToSchedule(course: Course): void {
    // Check if the course already exists in the schedule
    const isDuplicate = this.selectedCourses.some(c => c.courseCode === course.courseCode);

    // If the course is not already in the schedule, add it
    if (!isDuplicate) {
      this.selectedCourses.push(course);
      // Save updated schedule to localStorage
      localStorage.setItem('userSchedule', JSON.stringify(this.selectedCourses));
    } else {
      // If the course is already in the schedule, show a message or handle it as needed
      console.log('Course is already in the schedule');
    }
  }

  private getUniqueSubjects(): string[] {
    const subjects = this.courses.map(course => course.subject.toLowerCase());
    return Array.from(new Set(subjects));
  }
}
