
export interface Polaroids {
  full_length: Image,
  waist_up: Image,
  close_up: Image,
  profile: Image,
  _id: string,
}

export interface Portfolio {
  image: Image,
  model: string,
  _id: string,
}

export interface Socials {
  [key: string]: string
}
export interface Image {
  [x: string]: string | number | undefined
  asset_id: string,
  bytes: number
  created_at: string,
  etag: string,
  folder: string,
  format: string,
  height: number,
  original_filename: string,
  public_id: string,
  resource_type: string,
  secure_url: string,
  signature: string,
  version: number,
  version_id: string,
  _id: string,
  delete_token?: string,
  width: number,
}
export interface Model {
  name: string, gender: string, dob: string,
  cover_image: Image, waist: number,
  chest?: number, bust?: number, hips?: number,
  height: number, shoe: number, id: string,
  isActive: boolean, socials: Socials
}


export interface ModelWithPolaroidsAndPortfolio extends Model {
  polaroids: Polaroids,
  extra_polaroids: Polaroids[],
  portfolio: Portfolio[]
}
