<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Registrar Estudiante</h2>
            <form v-on:submit.prevent="processStudent" >
                <input type="text" v-model="student.name" placeholder="name">
                <input type="text" v-model="student.last_name" placeholder="last_name">
                <input type=text list=gender  v-model="student.gender" placeholder="gender">
                    <datalist id=gender>
                        <option>Masculino</option>
                        <option>Femenino</option>
                    </datalist>
                <input type="date" 
                       
                        min="1950-01-01" max="2050-12-31" v-model="student.date_of_birth">
                
                <input type="text" v-model="student.phone" placeholder="phone">
                <br>
                <input type="email" v-model="student.email" placeholder="email">
                <br>

               
                <br>
               <input type=text list=grade  v-model="student.grade" placeholder="grade">
                    <datalist id=grade>
                        <option>Jardin</option>
                        <option>Transición</option>
                        <option>Primero</option>
                        <option>Segundo</option>
                        <option>Tercero</option>
                        <option>Cuarto</option>
                        <option>Quinto</option>
                        <option>Sexto</option>
                        <option>Séptimo</option>
                        <option>Octavo</option>
                        <option>Noveno</option>
                        <option>Décimo</option>
                        <option>Once</option>
                    </datalist>
                <br>
                <input type=number   v-model="student.group" placeholder="group">
                <br>
                <button type="submit">Crear</button>
            </form>
        </div>
   



    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";


export default {
    name: "Student",

    data: function(){
        return {
            student: {
            name: "",
            last_name: "",
            gender : "",
            date_of_birth  :"",
            phone: "",
            email: "",
            grade: "",
            group: "",
           
        }
    }
},


methods: {
        processStudent: async function(){
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
            this.$emit('logOut');
            return;
            }
                await this.verifyToken();
                let token = localStorage.getItem("token_access");
                let userId = jwt_decode(token).user_id.toString();




            axios.post("https:/mision-tic-sie-be.herokuapp.com/student/",
            this.student,
            {headers: {'Authorization': `Bearer ${token}`}})
            .then((result)=>{alert("Estudiante creado correctamente");})
            .catch(()=>{
                if (error.response.status == "400")
                alert("ERROR 401: No fue posible crear el estudiante");})

        },

    verifyToken: async function () {
            return axios.post("https:/mision-tic-sie-be.herokuapp.com/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}}
        )
            .then((result) => {
                localStorage.setItem("token_access", result.data.access);
            })
        .catch(() => {
            this.$emit('logOut');

            });
        }
     },


    create: function(){}

}

</script>


<style>
    .signUp_user{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container_signUp_user {
        border-radius: 10px;
        width: 25%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .signUp_user h2{
        color: #283747;
    }

    .signUp_user form{
        width: 70%;
    }

    .signUp_user input{
        height: 40px;
        width: 100%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }

    .signUp_user button{
        width: 100%;
        height: 40px;
        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }

    .signUp_user button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }


</style>