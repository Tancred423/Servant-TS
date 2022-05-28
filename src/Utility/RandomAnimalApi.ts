import axios, { AxiosRequestConfig } from 'axios'
import 'dotenv/config'
import { MathHelper } from '../Helpers/MathHelper'
import { StringHelper } from '../Helpers/StringHelper'

export interface AnimalData {
  url: string
  credits: string
}

export enum Animals {
  BIRD = 'bird',
  BUNNY = 'bunny',
  CAT = 'cat',
  DOG = 'dog',
  DUCK = 'duck',
  FOX = 'fox',
  KANGAROO = 'kangaroo',
  KOALA = 'koala',
  LIZARD = 'lizard',
  PANDA = 'panda',
  RACOON = 'racoon',
  RED_PANDA = 'red_panda',
  SHIBA = 'shiba',
  SLOTH = 'sloth',
}

export class RandomAnimalApi {
  public static async get(animal: Animals): Promise<AnimalData> {
    try {
      let config, type, api, res, url: string

      switch (animal) {
        case Animals.BIRD:
          api = 'https://some-random-api.ml/img/birb'
          res = await axios.get(api)
          url = res?.data?.link
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'some-random-api.ml' }
          break

        case Animals.BUNNY:
          api = 'https://api.bunnies.io/v2/loop/random/?media=gif'
          res = await axios.get(api)
          url = res?.data?.media?.gif
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'bunnies.io' }
          break

        case Animals.CAT:
          config = {
            header: { 'x-api-key': process.env.CAT_API_KEY },
          } as AxiosRequestConfig<any>
          api = 'https://api.thecatapi.com/v1/images/search'
          res = await axios.get(api, config)
          url = res?.data?.[0]?.url
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'thecatapi.com' }
          break

        case Animals.DOG:
          api = 'https://dog.ceo/api/breeds/image/random'
          res = await axios.get(api)
          url = res?.data?.message
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'dog.ceo' }
          break

        case Animals.DUCK:
          type = MathHelper.getRandomBoolean() ? 'jpg' : 'gif'
          api = `https://random-d.uk/api/v2/quack?type=${type}`
          res = await axios.get(api)
          url = res?.data?.url
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'random-d.uk' }
          break

        case Animals.FOX:
          api = 'https://randomfox.ca/floof/'
          res = await axios.get(api)
          url = res?.data?.image
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'randomfox.ca' }
          break

        case Animals.KANGAROO:
          api = 'https://some-random-api.ml/img/kangaroo'
          res = await axios.get(api)
          url = res?.data?.link
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'some-random-api.ml' }
          break

        case Animals.KOALA:
          api = 'https://some-random-api.ml/img/koala'
          res = await axios.get(api)
          url = res?.data?.link
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'some-random-api.ml' }
          break

        case Animals.LIZARD:
          api = 'https://nekos.life/api/v2/img/lizard'
          res = await axios.get(api)
          url = res?.data?.url
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'nekos.life' }
          break

        case Animals.PANDA:
          api = 'https://some-random-api.ml/img/panda'
          res = await axios.get(api)
          url = res?.data?.link
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'some-random-api.ml' }
          break

        case Animals.RACOON:
          api = 'https://some-random-api.ml/img/racoon'
          res = await axios.get(api)
          url = res?.data?.link
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'some-random-api.ml' }
          break

        case Animals.RED_PANDA:
          api = 'https://some-random-api.ml/img/red_panda'
          res = await axios.get(api)
          url = res?.data?.link
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'some-random-api.ml' }
          break

        case Animals.SHIBA:
          api = 'http://shibe.online/api/shibes'
          res = await axios.get(api)
          url = res?.data?.[0]
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'shibe.online' }
          break

        case Animals.SLOTH:
          api = ' https://sloth.pics/api'
          res = await axios.get(api)
          url = res?.data?.url
          if (await StringHelper.isValidImageUrl(url))
            return { url: url, credits: 'sloth.pics' }
          break
      }

      throw new Error(`Failed to fetch ${animal}`)
    } catch (error) {
      throw new Error(`Failed to fetch ${animal}`)
    }
  }
}
