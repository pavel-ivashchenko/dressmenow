
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { GRID_TIERS } from '@app/shared/constants';
import { toggleVisiblityOnScroll } from '@app/shared/helpers';
import { Observable, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video;
  @ViewChild('parallax') parallax;

  public showVideoBg = false;
  public showPlayOverlay = false;
  public isSloganVisible$: Observable<boolean>;

  private sloganVisibilityHeight = 500;

  private videoEvents$: Observable<any>;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.showVideoBg = this.document.documentElement.offsetWidth >= GRID_TIERS.LG;
    this.isSloganVisible$ = toggleVisiblityOnScroll(this.parallax.nativeElement, this.sloganVisibilityHeight, false);
  }

  ngAfterViewInit() {
    if (this.video && this.video.nativeElement.play()) {
      this.video.nativeElement.controls = false;
      this.video.nativeElement.play()
        .then(_ => this.showPlayOverlay = false)
        .catch(_ => this.showPlayOverlay = true);
      this.cdr.detectChanges();
    }
  }

  public onPlay(): void {
    this.showPlayOverlay = false;
    this.video.nativeElement.play();
  }

}
