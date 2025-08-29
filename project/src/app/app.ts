import { Component, signal } from '@angular/core';
import { Header } from "./layout/header/header";
import { Sidebar } from "./layout/sidebar/sidebar";
import { Footer } from "./layout/footer/footer";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, Footer, RouterModule, ReactiveFormsModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('project');
  formGroup: any
}








