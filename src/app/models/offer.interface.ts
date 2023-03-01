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
  material?: {name: string},
  meterial_type_id?: string,
  size_type_id?: string,
  type_id?: string,
  size_type?: {name: string},
  type?: {name: string},
  size?: string;
  user: UserInterface;
  category_id: string;
  city_id: string;
  region_id: string;
  created_at: string;
  name: string;
  amount: string;
  description: string;
  image: any[];
  disabled: string;
  city: CityInterface;
  favorites_count: number;
  category: Category;
  delivery?: string;
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
