<template>
    <div class="row logo d-flex justify-content-center">
        <div class="col-md-5 m-5">
            <img src="https://cdn-icons-png.flaticon.com/512/1028/1028924.png" class="img-fluid rounded-top" alt="">
            <h3>It's Todo App Vue</h3>
        </div>
    </div>
    <div class="row d-flex justify-content-center mb-5">
        <div class="col-md-6 text-center">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="todo.title" placeholder="Enter Todo">
                <button class="btn btn-primary" type="button" @click="addItem($event)">Add Item <i
                        class="fas fa-check"></i></button>
            </div>
        </div>
    </div>
    <div class="row d-flex justify-content-center">
        <div class="col-md-10">
            <table v-if="todoLists.length > 0" class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Title</th>
                        <th scope="col">Created At</th>
                        <th scope="col" class="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in todoLists" :key="index" :class="{ 'bg-success text-white': item.status }">
                        <td scope="row" :class="{ 'text-white': item.status }">{{ (index + 1) }}</td>
                        <td>
                            <div class="form-check">
                                <input class="form-check-input" @click="changeStatus(item)" type="checkbox"
                                    :checked="item.status">
                            </div>
                        </td>
                        <td :class="{ 'text-white': item.status }">{{ item.title }}</td>
                        <td :class="{ 'text-white': item.status }">{{ item.created_at }}</td>
                        <td>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-danger btn-sm" type="button" @click="deleteItem(item)"><i
                                        class="fas fa-close"></i></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else class="text-center fw-bold">Data not found !</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import TodoService from '../services/TodoService.js';
export default {
    data() {
        return {
            todoLists: [],
            todo: {
                status: false,
                title: '',
                created_at: null
            }
        }
    },
    methods: {
        fetchData() {
            TodoService.index()
                .then(res => {
                    console.log(res.data)
                    this.todoLists = res.data
                })
        },

        addItem() {
            this.todo.created_at = moment().format('DD-MM-YYYY')

            TodoService.store(this.todo)
                .then(res => {
                    console.log(res.data.id)
                    this.fetchData()
                })

            this.todo = {}
        },

        changeStatus(item) {
            item.status = !item.status
            TodoService.update(item.id, item)
                .then(res => {
                    console.log(res.data)
                    this.fetchData()
                })
        },

        deleteItem(item) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: `You will delete todo item ${item.id}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    TodoService.destroy(item.id)
                        .then(() => {
                            this.fetchData()
                            this.$swal.fire(
                                'Deleted!',
                                'Your todo has been deleted.',
                                'success'
                            )
                        })
                }
            })
        }
    },

    mounted() {
        this.fetchData()
    }
}
</script>