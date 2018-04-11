let Dropbox = require('dropbox').Dropbox
let dbx = new Dropbox({ accessToken: 'F9G1jrnCvJ0AAAAAAAAE5nySEgpC6q-qBwcHvsLLVft4TgVmT1N1rgFWxkGp_6k2' })

export const uploadFile = async (file: any, name: string) => {
  return dbx.filesUpload({path: `/${name}`, contents: file})
}