import { fireAuth, fireStore, fireDb, googleAuth } from '~/plugins/firebase.js'

function UploadFile(filename, file) {
  return new Promise(function(resolve, reject) {
    if (!file) {
      const message = 'No file !!'
      reject(message)
    }

    const storageRef = fireStore.ref(filename)

    const uploadTask = storageRef.put(file)
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        let message = ''
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            message = "User doesn't have permission to access the object"
            break

          case 'storage/canceled':
            // User canceled the upload
            message = ' User canceled the upload'
            break

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            message = ' Unknown error occurred, inspect error.serverResponse'
            break
        }
        reject(message)
      },
      function() {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL)

          resolve(downloadURL)
        })
      }
    )
  })
}

export default {
  async googleAuth(locale) {
    const payload = {}
    try {
      fireAuth.languageCode = locale
      const result = await fireAuth.signInWithPopup(googleAuth)
      payload.token = await fireAuth.currentUser.getIdToken()
      payload.user = await fireAuth.currentUser
      payload.profile = result.additionalUserInfo.profile
      return payload
    } catch (error) {
      throw error
    }
  },
  async resetPassword(email, locale) {
    try {
      fireAuth.languageCode = locale
      const actionCodeSettings = {
        // After password reset, the user will be give the ability to go back
        // to this page.
        url: 'http://localhost:3000',
        handleCodeInApp: false
      }
      await fireAuth.sendPasswordResetEmail(email, actionCodeSettings)
    } catch (error) {
      throw error
    }
  },
  async readProfile(uid) {
    if (!uid) {
      return null
    }
    const ref = fireDb.collection('userprofiles').doc(uid)
    let profile, doc
    try {
      doc = await ref.get()
      profile = doc.data()
      // console.log('Profile ==>', profile)
      return profile
    } catch (error) {
      throw error
    }
  },
  async AddProfile(profile) {
    try {
      await fireDb
        .collection('userprofiles')
        .doc(profile.uid)
        .set(profile)
      return profile
    } catch (error) {
      throw error
    }
  },

  async UploadImg(filename, file) {
    try {
      const url = await UploadFile(filename, file)
      return url
    } catch (error) {
      throw error
    }
  },

  async CheckUser(email) {
    try {
      const res = await fireAuth.fetchSignInMethodsForEmail(email)
      return res
    } catch (error) {
      throw error
    }
  },
  async SignIn(email, password) {
    const payload = {}
    try {
      await fireAuth.signInWithEmailAndPassword(email, password)
      payload.token = await fireAuth.currentUser.getIdToken()
      payload.user = await fireAuth.currentUser
      return payload
    } catch (error) {
      throw error
    }
  },
  async SignUp(email, password) {
    const payload = {}
    try {
      await fireAuth.createUserWithEmailAndPassword(email, password)
      payload.token = await fireAuth.currentUser.getIdToken()
      payload.user = await fireAuth.currentUser
      return payload
    } catch (error) {
      throw error
    }
  },
  async SignOut() {
    try {
      await fireAuth.signOut()
    } catch (error) {
      throw error
    }
  }
}
