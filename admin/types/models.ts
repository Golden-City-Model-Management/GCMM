
export interface Polaroids {
  full_length: Image,
  half_length: Image,
  head_shot: Image,
  side_profile: Image,
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
  first_name: string, last_name: string, name: string, gender: string, dob: string,
  cover_image: Image, waist: number,
  chest?: number, bust?: number, hips?: number,
  height: number, shoe: number, id: string, hair_color: string, eye_color: string,
  isActive: boolean, socials: Socials, is_new_face: boolean | string, is_main_board: boolean | string
}


export interface ModelWithPolaroidsAndPortfolio extends Model {
  polaroids: Polaroids,
  extra_polaroids: Polaroids[],
  portfolio: Portfolio[]
}
