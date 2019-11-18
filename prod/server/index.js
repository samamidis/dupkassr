"use strict"

// // [START import]
const functions = require("firebase-functions")
const admin = require("firebase-admin")

const vision = require("@google-cloud/vision")
const spawn = require("child-process-promise").spawn
const path = require("path")
const os = require("os")
const cd = require("fs")

const { Nuxt } = require("nuxt")
// const express = require("express")

// const app = express()

const config = {
  dev: false,

  plugins: [{ src: "@/plugins/google-maps", ssr: true }],

  router: {
    middleware: "router-auth"
  },
  modules: [["@nuxtjs/axios"]],
  buildDir: "nuxt",
  build: {
    publicPath: "/assets/"
  }
}
const nuxt = new Nuxt(config)
exports.nuxtssr = functions.https.onRequest(async (request, response) => {
  console.log("log3", request.headers.cookie)
  const result = await nuxt.renderRoute(request.originalUrl, { request })
  response.send(result.html)
})
// function handleRequest(req, res) {
//   console.log("log3", req.headers.cookie)
//   res.set("Cache-Control", "public, max-age=300, s-maxage=600")
//   return new Promise((resolve, reject) => {
//     nuxt.render(req, res, promise => {
//       console.log("Nuxtrender", req.headers.cookie)
//       promise.then(resolve).catch(reject)
//     })
//   })
// }

// app.use(handleRequest)
// exports.nuxtssr = functions.https.onRequest(app)

// Tune these detection likelihoods to suit your app.
// UNKNOWN	Unknown likelihood.
// VERY_UNLIKELY	It is very unlikely that the image belongs to the specified vertical.
// UNLIKELY	It is unlikely that the image belongs to the specified vertical.
// POSSIBLE	It is possible that the image belongs to the specified vertical.
// LIKELY	It is likely that the image belongs to the specified veical.
// VERY_LIKELY	It is very likely that the image belongs to the specified vertical.

function check(object) {
  return new Promise(async (resolve, reject) => {
    // Check the image content using the Cloud Vision API.
    const visionClient = new vision.ImageAnnotatorClient()
    const data = await visionClient.safeSearchDetection(
      `gs://${object.bucket}/${object.name}`
    )

    const safeSearch = data[0].safeSearchAnnotation
    console.log("SafeSearch results on image", safeSearch)

    function rate(degree) {
      var result
      switch (degree) {
        case "UNKNOWN":
          result = 0
          break
        case "VERY_UNLIKELY":
          result = 1
          break
        case "UNLIKELY":
          result = 2
          break
        case "POSSIBLE":
          result = 3
          break
        case "LIKELY":
          result = 4
          break
        case "VERY_LIKELY":
          result = 5
          break
      }
      return result
    }
    // console.log("safeSearch.adult :" + rate(safeSearch.adult));
    // The current settings show the most strict configuration
    // Docs: https://cloud.google.com/vision/docs/reference/rpc/google.cloud.vision.v1#google.cloud.vision.v1.SafeSearchAnnotation
    if (
      rate(safeSearch.adult) > 2 ||
      rate(safeSearch.spoof) > 2 ||
      rate(safeSearch.medical) > 2 ||
      rate(safeSearch.violence) > 2 ||
      rate(safeSearch.racy) > 2
    ) {
      console.log("Offensive image found. Blurring.")
      resolve(
        blurImage(
          object.name,
          object.bucket,
          object.metadata,
          path.join(os.tmpdir(), path.basename(object.name))
        )
      )
    } else {
      resolve("Image passed not offensive.")
    }
  })
}

/**
 * Blurs the given image located in the given bucket using ImageMagick.
 */
const blurImage = async function(filePath, bucketName, metadata, temppath) {
  // Blur the image using ImageMagick.
  await spawn("convert", [
    temppath,
    "-channel",
    "RGBA",
    "-blur",
    "0x8",
    temppath
  ])
  console.log("Blurred image created at", temppath)
}

function thump(object, resolution) {
  return new Promise(async (resolve, reject) => {
    const fileBucket = object.bucket // The Storage bucket that contains the file.
    const filePath = object.name // File path in the bucket.
    const contentType = object.contentType // File content type.
    // const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

    const fileName = path.basename(filePath)
    const bucket = admin.storage().bucket(fileBucket)
    const tempFilePath = path.join(os.tmpdir(), fileName)
    const metadata = { contentType: contentType, customMetadata: "screened" }

    // Generate a thumbnail using ImageMagick.
    await spawn("convert", [
      tempFilePath,
      "-thumbnail",
      resolution,
      tempFilePath
    ])
    console.log("Thumbnail created at", tempFilePath)
    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    const thumbFileName = `thumb_sani_${fileName}`

    let delfile = path.join(path.dirname(filePath), fileName)
    await bucket.file(delfile).delete()

    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName)
    // Uploading the thumbnail.
    let resfile = path.join(path.dirname(filePath), fileName)
    console.log("Upload File : " + resfile)
    await bucket.upload(tempFilePath, {
      destination: resfile,
      metadata: {
        // set amark on metadta object gia na min epanalavoume thn diaidkasia
        cacheControl: "public, max-age=31536000"
      }
    })

    cd.unlink(tempFilePath, err => {
      if (err) throw err
      console.log(tempFilePath + " was deleted")
    })
    // Once the thumbnail has been uploaded delete the local file to free up disk space.
    return {
      message: `Success!`
    }
    // [END thumbnailGeneration]
  })
}

exports.imageProcess = functions.storage.object().onFinalize(async object => {
  //console.log('Triger')
  const fileBucket = object.bucket // The Storage bucket that contains the file.
  const filePath = object.name // File path in the bucket.
  const contentType = object.contentType // File content type.
  // const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  const fileName = path.basename(filePath)
  const bucket = admin.storage().bucket(fileBucket)
  const tempFilePath = path.join(os.tmpdir(), fileName)
  const metadata = { contentType: contentType }

  console.log("filename :", fileName, "  Filepath :", filePath)

  // [END eventAttributes]
  const [meta] = await bucket.file(filePath).getMetadata()
  if (meta.cacheControl && meta.cacheControl === "public, max-age=31536000") {
    console.log("Already  Thumbnailed && Screned.")
    resolve("Already  Thumbnailed && Screned.", meta)
  }

  // [START stopConditions]
  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith("image/")) {
    console.log("This is not an image.")
    resolve("This is not an image.")
  }
  let resolution
  if (filePath.indexOf("profile_img") !== -1) {
    console.log("Is Profile")
    resolution = "200X200>"
  } else {
    console.log("Is Image")
    resolution = "800X800>"
  }
  // [END stopConditions]
  await bucket.file(filePath).download({ destination: tempFilePath })
  console.log("Image downloaded locally to", tempFilePath)

  var chks = await check(object)
  var thmb = await thump(object, resolution)
  console.log("Process ended sucsesfully.")
  resolve("Process ended sucsesfully")
})

//************************************************************************* */
admin.initializeApp()

exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  /* if ( context.auth.token.admin !== true ) {
      return { error: 'Only admins can add other admins' }
    }*/
  // get user and add admin custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      })
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`
      }
    })
    .catch(err => {
      return err
    })
})
