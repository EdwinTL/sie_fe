<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <h2>Crear Grupo</h2>
            <form v-on:submit.prevent="processGroup" >
               <input type=text list=name  v-model="group.name" placeholder="Name">
                    <datalist id=name>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                    </datalist>
                <br>
               <input type=text list=grade  v-model="group.grade" placeholder="Grade">
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
                <button type="submit">Crear</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from "jwt-decode";


export default {
    name: "Group",

    data: function(){
        return {
            group: {
            name: "",
            grade: ""
           
        }
    }
},


methods: {
        processGroup: async function(){
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
            this.$emit('logOut');
            return;
            }
                await this.verifyToken();
                let token = localStorage.getItem("token_access");
                let userId = jwt_decode(token).user_id.toString();




            axios.post("https:/mision-tic-sie-be.herokuapp.com/group/",
            this.group,
            {headers: {'Authorization': `Bearer ${token}`}})
            .then((result)=>{alert("Grupo creado correctamente");})
            .catch(()=>{
                if (error.response.status == "400")
                alert("ERROR 401: No fue posible crear el grupo");
                
                })

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