/*
Object {
      "__typename": "Moment",
      "description": "Vattnade blomman",
      "imageUri": "https://i.imgur.com/6jk8XJB.jpg",
      "tags": Array [
        "healthy",
        "water",
      ],
      Symbol(id): "User:cjfl3csfh802i0177m1v8n9qp.plants.0.moments.0",
    },
  ],
  "name": "Charlie",
  Symbol(id): "User:cjfl3csfh802i0177m1v8n9qp.plants.0",
}
*/
interface IIMages {
    [index: string] : {
      uri: string
    }
}
interface IMoment {
  description?: string
  imageUri?: string
  tags?: string[]
}
interface IPlant {
  id: string
  name: string
  moments: IMoment[]
  shared: boolean
  sharedUsers: any
}

export default class Plant {
  private _id: string
  private _name: string
  private _images: IIMages
  private _moments: IMoment[]
  private _sharedUsers: any[]
  private _coverPhoto: string

  constructor(plantObject:IPlant) {
    this._id = plantObject.id
    this._name = plantObject.name
    this._sharedUsers = plantObject.sharedUsers
    this._moments = plantObject.moments
    this._coverPhoto = 'https://i.imgur.com/sikAQTE.png'
    const getCoverPhoto = async () => {
      for (let moment of this._moments) {
        if (moment.imageUri) {
          const image = await fetch(moment.imageUri)
          // this._coverPhoto = (await image.text())
          console.log(this._coverPhoto)
        }
      }
    }
    getCoverPhoto()
  }

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }
  public get moments(): any[] {
    return this._moments
  }
  public get coverPhotoUri(): string {
    return this._coverPhoto
  }

  get shared(): boolean {
    return !!this._sharedUsers.length
  }
}
