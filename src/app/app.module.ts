import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FirestoreModule } from './firestore/firestore.module'

import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { UsersComponent } from './views/users/users.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UserFormDialogComponent } from './views/users/user-form-dialog/user-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { BooksComponent } from './views/books/books.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { RentsComponent } from './views/rents/rents.component';
import { ReservationsComponent } from './views/reservations/reservations.component';
import { AuthorFormDialogComponent } from './views/authors/author-form-dialog/author-form-dialog.component';
import { BookFormDialogComponent } from './views/books/book-form-dialog/book-form-dialog.component';
import { RentFormDialogComponent } from './views/rents/rent-form-dialog/rent-form-dialog.component';
import { ReservationFormDialogComponent } from './views/reservations/reservation-form-dialog/reservation-form-dialog.component';
import { TelefoneMaskPipe } from './shared/pipes/telefone-mask.pipe';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { MoneyFormatPipe } from './shared/pipes/money-format.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    UserFormDialogComponent,
    NavbarComponent,
    BooksComponent,
    RentsComponent,
    ReservationsComponent,
    AuthorsComponent,
    AuthorFormDialogComponent,
    BookFormDialogComponent,
    RentFormDialogComponent,
    ReservationFormDialogComponent,
    TelefoneMaskPipe,
    DateFormatPipe,
    MoneyFormatPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    FirestoreModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
