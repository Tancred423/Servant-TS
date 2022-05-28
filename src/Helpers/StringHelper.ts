import axios from 'axios'

export class StringHelper {
  public static async isValidUrl(
    url: string | null | undefined
  ): Promise<boolean> {
    if (typeof url !== 'string') return false
    const res = await axios.get(url)
    return res?.status === 200
  }

  public static async isValidImageUrl(
    url: string | null | undefined
  ): Promise<boolean> {
    if (!this.isValidUrl(url)) return false
    return (
      url!!.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !==
      null
    )
  }
}
