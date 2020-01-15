
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, AfterViewInit {

  @ViewChild('video') video;
  public showPlayOverlay = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

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
