export interface theme {
    themeId: number,
    name: string,
    image: string
}


export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export const defaultThemeInfo = {
  themeId: 0,
  name: '',
  title: '',
  description: '',
  backgroundColor: '',
}