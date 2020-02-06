
import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef,
  AfterViewInit, ViewChild, Inject
} from '@angular/core';
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

  public isVideoBgVisible = false;
  public isPlayOverlayVisible = false;
  public isCarouselVisible = false;
  public isCollectionVisible = false;
  public isTitlesSectionVisible = false;
  public isAdFeaturesVisible = true;
  public isSloganVisible$: Observable<boolean>;

  private sloganVisibilityHeight = 500;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.isVideoBgVisible = this.document.documentElement.offsetWidth >= GRID_TIERS.LG;
    this.isSloganVisible$ = toggleVisiblityOnScroll(this.parallax.nativeElement, this.sloganVisibilityHeight, false);
  }

  ngAfterViewInit() {
    if (this.video) {
      const playPromise = this.video.nativeElement.play();
      if (playPromise) {
        playPromise.catch(_ => {
          this.isPlayOverlayVisible = this.video.nativeElement.paused;
          this.cdr.detectChanges();
        });
      }
    }
  }

  public onPlay(): void {
    this.isPlayOverlayVisible = false;
    this.video.nativeElement.play();
  }

}
