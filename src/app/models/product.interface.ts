import { CityInterface } from './city.interface'

export interface Category {
  id: string;
  parent_id: string;
  name: string;
  sort: string;
  disabled: string;
}

export interface Offer {
  id: string;
  user_id: string;
  category_id: string;
  city_id: string;
  region_id: string;
  created_at: string;
  name: string;
  amount: string;
  description: string;
  image: string;
  disabled: string;
  city: CityInterface;
  category: Category;
  favorite: number;
}

