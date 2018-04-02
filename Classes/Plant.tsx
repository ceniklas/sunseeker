interface IIMages {
    [index: string] : {
      uri: string
    }
}
interface IPlant {
  id: string
  name: string
  images: IIMages
  shared: boolean
}

export default class Plant {
  private _id: string
  private _name: string
  private _images: IIMages
  private _shared: boolean

  constructor(plantObject:IPlant) {
    this._id = plantObject.id
    this._name = plantObject.name
    this._images = plantObject.images
    this._shared = plantObject.shared
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get coverPhotoUri(): string {
    return this._images[Object.keys(this._images)[0]].uri
  }

  get shared(): boolean {
    return !!this._shared
  }
}
