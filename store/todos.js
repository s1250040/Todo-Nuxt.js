import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()           //データベースの設定
const todosRef = db.collection('todos')  //collectionはtodosを使う

export const state = () => ({   //stateを定義
    todos: []         //todosを配列で管理
})

export const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('todos',todosRef)       //引数にバインドしたいデータの名前とコレクションへのデータの参照を渡す　ーー＞　state.todosにcloudfirestoreのデータが関連付けされる
    }),
    add: firestoreAction((context, name) => {   //
        if (name.trim()) {     //入力値が空白のときはデータが追加されない
            todosRef.add({     //dataをfirestoreに登録
                name: name,    //タスクの名前
                done: false,   //タスクの完了未完了
                created: firebase.firestore.FieldValue.serverTimestamp()   //タスクが追加された時間 サーバーから時刻を取得するようにしている
            })
        }
    }),
    remove: firestoreAction((context, id) => {
        todosRef.doc(id).delete()
    }),
    toggle: firestoreAction((context, todo) => {   //todoの完了未完了をチェックする　//第二引数でtodoのデータを受け取る
        todosRef.doc(todo.id).update({      //ドキュメントidを指定してupdateする
            done: !todo.done       //データをupdate
        })
    })
}

export const getters = {
    orderdTodos: state => {
        return _.sortBy(state.todos, 'created')
    }
}