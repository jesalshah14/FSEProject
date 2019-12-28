import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotesService } from './services/notes.service';
import { NoteComponent } from './note/note.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { EditUserViewComponent } from './edit-user-view/edit-user-view.component';
import { UserService } from './services/user.service';
import { HeaderSubComponent } from './header-sub/header-sub.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { CategoryService } from './services/category.service';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
//import { CanActivateRouteGuard } from './can-activate-route.guard';
import { MatDividerModule } from '@angular/material/divider';
import { ReminderComponent } from './reminder/reminder.component';
import { ReminderViewComponent } from './reminder-view/reminder-view.component';
import { EditReminderOpenerComponent } from './edit-reminder-opener/edit-reminder-opener.component';
import { ReminderService } from './services/reminder.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';

const appRoute: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'category', component: CategoryComponent, canActivate: [CanActivateRouteGuard],
    children: [{
      path: 'category/:categoryId/edit', component: EditCategoryOpenerComponent, outlet: 'categoryEditOutlet'
    }
    ]
  },
  {
    path: 'reminder', component: ReminderComponent, canActivate: [CanActivateRouteGuard],
    children: [{
      path: 'reminder/:reminderId/edit', component: EditReminderOpenerComponent, outlet: 'reminderEditOutlet'
    }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: '',
        redirectTo: 'view/noteview',
        pathMatch: 'full'
      },
      {
        path: 'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  },
  { path: 'user', component: UserComponent, canActivate: [CanActivateRouteGuard] },
  { path: 'user/edit/:userId', component: EditUserViewComponent, canActivate: [CanActivateRouteGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteComponent,
    ListViewComponent,
    NoteTakerComponent,
    NoteViewComponent,
    EditNoteOpenerComponent,
    EditNoteViewComponent,
    SignupComponent,
    UserComponent,
    EditUserViewComponent,
    HeaderSubComponent,
    CategoryComponent,
    EditCategoryViewComponent,
    EditCategoryOpenerComponent,
    ReminderComponent,
    ReminderViewComponent,
    EditReminderOpenerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoute),
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,

    MatDividerModule
  ],
  providers: [
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard,
    NotesService,
    UserService,
    CategoryService,
    ReminderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent, EditCategoryViewComponent, ReminderViewComponent]
})

export class AppModule { }
