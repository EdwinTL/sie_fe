import { createRouter, createWebHistory } from "vue-router";
import App from './App.vue';
import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Grade from './components/Grade.vue'
import Group from './components/Group.vue'
import Student from './components/Student.vue'
import Query from './components/Query.vue'

const routes = [{
        path: '/',
        name: 'root',
        component: App
    },
    {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp
    },
    {
        path: '/user/home',
        name: "home",
        component: Home
        },

    {
        path: '/user/grade',
        name: "grade",
        component: Grade
        },
    {
        path: '/user/group',
        name: "group",
        component: Group
        },

        {
            path: '/user/student',
            name: "student",
            component: Student
            },

            {
                path: '/user/query',
                name: "query",
                component: Query
                },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;