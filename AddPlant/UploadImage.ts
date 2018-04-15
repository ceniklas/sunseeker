let Dropbox = require('dropbox').Dropbox
let dbx = new Dropbox({ accessToken: 'F9G1jrnCvJ0AAAAAAAAE5nySEgpC6q-qBwcHvsLLVft4TgVmT1N1rgFWxkGp_6k2' })

export const uploadFile = async (file: any, name: string) => {
  const fileName = `/${name}`
  await dbx.filesUpload({path: fileName, contents: file})
  const url = await dbx.sharingCreateSharedLink({path: fileName})
  console.log(url)
  return url.url.replace('dl=0', 'raw=1')
}