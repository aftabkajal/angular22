import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ICategory } from '../model/category.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  imports: [FormsModule, NgClass],
  selector: 'app-category-master',
  styleUrl: './category-master.css',
  templateUrl: './category-master.html',
})
export class CategoryMaster implements OnInit {

  http = inject(HttpClient);

  categoryList = signal<ICategory[]>([]);

  newCategory: ICategory = {
    categoryId: 0,
    categoryName: '',
    isActive: false
  };

  ngOnInit() {
    this.getAllcategory();
  }

  getAllcategory() {
    this.http.get('https://api.freeprojectapi.com/api/Enquiry/get-categories').subscribe({
      next: (res: any) => {
        this.categoryList.set(res.data);
      }
    });
  }

  onSaveCategory() {
    if (this.newCategory.categoryName.trim() === '') {
      alert('Please enter category name');
      return;
    }

    this.http.post('https://api.freeprojectapi.com/api/Enquiry/create-category', this.newCategory).subscribe({
      next: (res: any) => {
        if (res.result === true) {
          alert('Category added successfully');
          this.getAllcategory();
          this.newCategory = {
            categoryId: 0,
            categoryName: '',
            isActive: false
          };
        } else {
          alert(res.message || 'Failed to add category');
        }
      }
    });
  }

  onUpdateCategory() {
    if (this.newCategory.categoryName.trim() === '') {
      alert('Please enter category name');
      return;
    }

    this.http.put(`https://api.freeprojectapi.com/api/Enquiry/update-category/${this.newCategory.categoryId}`, this.newCategory).subscribe({
      next: (res: any) => {
        if (res.result === true) {
          alert('Category updated successfully');
          this.getAllcategory();
          this.newCategory = {
            categoryId: 0,
            categoryName: '',
            isActive: false
          };
        } else {
          alert(res.message || 'Failed to update category');
        }
      }
    });
  }

  editCategory(category: ICategory) {
    const stringObj = JSON.stringify(category);
    const parsedObj = JSON.parse(stringObj);
    this.newCategory = { ...parsedObj };
  }

  deleteCategory(category: ICategory) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.http.delete(`https://api.freeprojectapi.com/api/Enquiry/delete-category/${category.categoryId}`).subscribe({
        next: (res: any) => {
          if (res.result === true) {
            alert('Category deleted successfully');
            this.getAllcategory();
          } else {
            alert(res.message || 'Failed to delete category');
          }
        }
      });
    }
  }
}
