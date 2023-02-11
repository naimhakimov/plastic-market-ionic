import { CityInterface } from './city.interface'
import { UserInterface } from './user.interface'

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
  user: UserInterface;
  category_id: string;
  city_id: string;
  region_id: string;
  created_at: string;
  name: string;
  amount: string;
  description: string;
  image: string[];
  disabled: string;
  city: CityInterface;
  category: Category;
  favorite: number;
}

export interface Type {
  id: string | number
  name: string
}

export interface OfferManual {
  types: Type[]
  meterial_types: Type[]
  sort_types: Type[]
  size_types: Type[]
}
