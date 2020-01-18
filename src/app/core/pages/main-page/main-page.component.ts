
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { GRID_TIERS } from '@app/shared/constants';
import { toggleVisiblityOnScroll } from '@app/shared/helpers';
import { Observable } from 'rxjs';

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

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.showVideoBg = this.document.documentElement.offsetWidth >= GRID_TIERS.LG;
    this.isSloganVisible$ = toggleVisiblityOnScroll(this.parallax.nativeElement, this.sloganVisibilityHeight, false);
  }

  ngAfterViewInit() {
    this.video.nativeElement.controls = false;
    const videoPromise = this.video.nativeElement.play();
    if (videoPromise) {
      videoPromise.catch(_ => {
        this.showPlayOverlay = true;
        this.cdr.detectChanges();
      });
    }
  }

  public onPlay(): void {
    this.showPlayOverlay = false;
    this.video.nativeElement.play();
  }

}