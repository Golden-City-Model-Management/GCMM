
export const parseParam = (param: string | string[] | undefined) => {
  if(param){
    return Array.isArray(param) ? param[0] : param
  }
  return param
}