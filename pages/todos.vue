<template>
    <div>
        <div class="form">
            <form v-on:submit.prevent="add">   <!--"add"これで呼び出すメソッドを定義   .preventはボタンが押されたときにページがリロードされないように-->
            <input v-model="name">  <!--nameとデータをバインドしている-->
            <button>Add</button>
            </form>
        </div>
        <!-- {{ todos }} -->
        <ul>
            <li v-for="todo in todos" :key="todo.id">  <!--todo.idはcloudfirestoreのデータ一件ごとに付与されるドキュメントidのこと-->
            <!-- {{todos}} -->
            <span v-if="todo.created">   <!--todo.createdに値があるときだけspanないを描画する-->
                <input type="checkbox"
                v-bind:checked="todo.done"  
                @change="toggle(todo)">   <!--checkboxのチェックの状況についてtodo.doneをバインドすることでfirestore上のデータに基づいてonoffを表示-->
                                        <!--@changeでcheckの状態が変わった時にtoggleメソッドを呼び出す　結果firebase上のデータを更新する-->
                <span v-bind:class="{done: todo.done}">     <!--各todoのdoneの値がtrueだったらdaneクラスが設定される vue.js復習-->                       
                {{todo.name}} {{todo.created.toDate() | dateFilter}}
                </span>
                <button v-on:click="remove(todo.id)">X</button>
                <!-- {{todo.id}} -->
            </span>
            </li>
        </ul>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data: function(){   //新規登録されるデータを一時保存しておくdataを用意
        return {
            name: '',
            done: false
        }
    },
    created: function() {
        this.$store.dispatch('todos/init')
    },
    methods: {
        add() {    
            this.$store.dispatch('todos/add', this.name)    //dispatchで呼ばれるのがtodos.jsのadd
            this.name = ''
        },
        remove(id) {
            this.$store.dispatch('todos/remove', id)
        },
        toggle(todo){
            this.$store.dispatch('todos/toggle', todo)
        }
    },
    computed: {
        todos() {
            // return this.$store.state.todos.todos  //この値はstoreのtodos.jsのtodoの配列の値をさしている
            return this.$store.getters['todos/orderdTodos']
        }
    },
    filters: {
        dateFilter: function(date) {
            return moment(date).format('YYYY/MM/DD HH:mm:ss')
        }
    }
}
</script>

<style>
li > span > span.done{
    text-decoration: line-through;
}
</style>

