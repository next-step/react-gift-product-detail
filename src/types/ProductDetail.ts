interface Announcement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetailInfo {
  description: string;
  announcements: Announcement[];
}
