export interface CityInterface {
  id: string;
  name: string;
  sort: string;
  disabled: string;
  region_id: string;
}

export interface RegionInterface {
  id: string;
  name: string;
  sort: string;
  disabled: string;
  district_id: string;
}
