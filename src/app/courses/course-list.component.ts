import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from './course';

@Component({
  // selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  filteredCourses: Course[] = [];

  _courses: Course[] = [];

  _filterBy!: string;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.retrieveAll();
    // this.courses = [
    //     {
    //         id: 1,
    //         name: 'Angular: Forms',
    //         imageUrl: '/assets/images/forms.png',
    //         price: 99.99,
    //         code: 'OPG-7154',
    //         duration: 120,
    //         rating: 7.2,
    //         releaseDate: 'September, 12, 2043'
    //     },
    //     {
    //         id: 2,
    //         name: 'Angular: HTTP',
    //         imageUrl: '/assets/images/http.png',
    //         price: 45.99,
    //         code: 'LP1-4599',
    //         duration: 80,
    //         rating: 6.4,
    //         releaseDate: 'November, 24, 2031'

    //     }
    // ]
  }

  retrieveAll(): void {
    this.courseService.retrieveAll().subscribe({
      next: (courses) => {
        this._courses = courses;
        this.filteredCourses = this._courses;
      },
      error: (err) => console.log('Error', err),
    });
  }

  deleteById(courseId: number): void {
    this.courseService.deleteById(courseId).subscribe({
      next: () => {
        console.log('Deleted with success');
        this.retrieveAll();
      },
      error: (err) => console.log('Error', err),
    });
  }

  set filter(value: string) {
    this._filterBy = value;

    this.filteredCourses = this._courses.filter(
      (course: Course) =>
        course.name.toLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) >
        -1
    );
  }

  get filter() {
    return this._filterBy;
  }
}
