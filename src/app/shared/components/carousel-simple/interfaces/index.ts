
export interface RawSlide {
  img: string;
  href: string;
  title: string;
}

export interface Slide {
  img: string;
  href: string;
  title: string;
  slide_number: number;
  visual_order: number;
}
