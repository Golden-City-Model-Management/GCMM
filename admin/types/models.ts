
export interface Polaroids {
  full_length: string,
  waist_up: string,
  close_up: string,
  profile: string,
}

export interface Portfolio {
  image: string,
  model: string,
  _id: string,
}

export interface Socials {
  [key: string]: string
}
export interface Model {
  name: string, gender: string, dob: string,
  cover_image: string, waist: number, 
  chest?: number, bust?: number, hips?: number,
  height: number, shoe: number, id: string, 
  isActive: boolean, socials: Socials
}


export interface ModelWithPolaroidsAndPortfolio extends Model {
  polaroids: Polaroids,
  extra_polaroids: Polaroids[],
  portfolio: Portfolio[]
}
