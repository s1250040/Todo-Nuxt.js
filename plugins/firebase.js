import firebase from 'firebase'

const config = {                                  //firebaseの初期化に必要なパラメータ、プロジェクトIDをオブジェクト形式で用意する　//必要なパラメータをここで定義
    projectId: process.env.FIREBASE_PROJECT_ID
}

if (!firebase.apps.length) {       //二重に初期化されないようにする
    firebase.initializeApp(config)  //ここで初期化引数にconfig
}

export default firebase