import { VBase } from "@vtex/api"

export const staleFromVBaseWhileRevalidate = async <T>(
  vbase: VBase,
  bucket: string,
  filePath: string,
  validateFunction: (params?: any) => Promise<T>,
  params?: any,
  options?: { expirationInHours?: number}
): Promise<T> => {
    const cachedData = await vbase.getJSON<StaleRevalidateData<T>>(bucket, filePath, true).catch() as StaleRevalidateData<T>
    if(!cachedData){
      const endDate = getTTL(options?.expirationInHours)
      return await revalidate<T>(vbase, bucket, filePath, endDate, validateFunction, params)
    }

    const { data, ttl} = cachedData as StaleRevalidateData<T>
    
    const today = new Date()
    const ttlDate = new Date(ttl)
    if(today < ttlDate){
      return data
    }
    const endDate = getTTL(options?.expirationInHours)
    revalidate<T>(vbase, bucket, filePath, endDate, validateFunction, params)
    return data
}

const getTTL = (expirationInHours?: number) => {
  const ttl = new Date()
  ttl.setHours(ttl.getHours() + (expirationInHours || 1 ))
  return ttl
}

const revalidate = async<T> (
  vbase: VBase, bucket: string, filePath: string,
  endDate: Date, validateFunction: (params?: any) => Promise<T>, params?: any) => {
  const data = await validateFunction(params)
  const revalidatedData = { data, ttl: endDate }
  vbase.saveJSON<StaleRevalidateData<T>>(bucket, filePath, revalidatedData).catch()
  return data
}