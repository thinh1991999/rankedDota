// theme interface
export interface MainThemeState {
  theme: Theme;
}

export interface Theme {
  theme: string;
  background: string;
  shadow: string;
  text: Border;
  border: Border;
  card: Card;
  animation: string;
  svg: string;
  svghover: string;
  button: Button;
  detailsButton: DetailsButton;
}

export interface Border {
  selected: string;
  notselected: string;
}

export interface Button {
  background: string;
  text: string;
  hover: Hover;
  border: string;
}

export interface Hover {
  background: string;
  text: string;
}

export interface Card {
  text: string;
  texthover: string;
  bghover: string;
}

export interface DetailsButton {
  background: string;
  text: string;
  border: string;
  hover?: DetailsButton;
}
