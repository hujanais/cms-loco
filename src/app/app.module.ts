import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RemoteContentPipe } from './pipes/remote-content.pipe';
import { ICSTranslocoPipe } from './pipes/ics-transloco.pipe';
import { ICSLocoSwitcherPipe } from './pipes/ics-locoswitcher.pipe';
import { SafeHtmlPipe } from './pipes/safehtml.pipe';
import { SafeUrlPipe } from './pipes/safeurl.pipe';
import { SafeResourceUrlPipe } from './pipes/saferesourceurl.pipe';

import { MissingInterceptor } from './transloco/transloco-missing-interceptor';
import { CustomInterceptor } from './transloco/transloco-interceptor';
import { TRANSLOCO_INTERCEPTOR, TRANSLOCO_MISSING_HANDLER, TRANSLOCO_TRANSPILER } from '@ngneat/transloco';
import { HomeComponent } from './components/home/home.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    RemoteContentPipe,
    ICSTranslocoPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
    SafeResourceUrlPipe,
    HomeComponent,
    PlaygroundComponent,
    VideoComponent,
    ICSLocoSwitcherPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    MatSlideToggleModule,
    FormsModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_MISSING_HANDLER,
      useClass: MissingInterceptor
    },
    {
      provide: TRANSLOCO_INTERCEPTOR,
      useClass: CustomInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
