interface Announcement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetailData {
  description: string;
  announcements: Announcement[];
}

export interface ProductDetailInfoProps {
  announcements: Announcement[];
}
