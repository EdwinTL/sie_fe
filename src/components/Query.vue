<template>
<div class="signUp_userc">
    <div class="container_signUp_userc">
            <h2>Consultar estudiante </h2>
            <!-- <form v-on:submit.prevent="getData" >-->
            <input  v-model="value.id"  placeholder="id" >
            <br>
                <button  v-on:click.capture="getDat" type="button">Consultar</button>
            <!--</form>-->
 
    </div>
    <div v-if="loaded" key="loaded" class="information">
                <h1>Información del estudiante</h1>
                <h2>Nombre: <span>{{name}}</span></h2>
                <h2>Apellido: <span>{{last_name}}</span></h2>
                <h2>Correo electrónico: <span>{{email}}</span></h2>
                <h2>Fecha de nacimiento: <span>{{date_of_birth}}</span></h2>
                <h2>Telefono: <span>{{phone}}</span></h2>
                <h2>Grado: <span>{{grade.id}}</span></h2>
                <h2>Descripcion de Grado: <span>{{grade.description}}</span></h2>
                <h2>Grupo: <span>{{group.name}}</span></h2>    
    </div>
        
</div>






</template>

<script>
import axios from 'axios';


export default {
    name: "Query",

    data: function(){
        return {
            student: { 
            name: "",
            last_name: "",
            gender : "",
            date_of_birth: "",
            phone: "",
            email: "",
            grade: "",
            group: "",
            loaded: true,

        },

        value:{
            id:""
        }
    }
},


methods: {

getDat: async function(){

if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
            this.$emit('logOut');
            return;
            }
               
            let token = localStorage.getItem("token_access");
            

            axios.get("https:/mision-tic-sie-be.herokuapp.com/student/"+this.value.id+"/",
            {headers: {'Authorization': `Bearer ${token}`}})
            .then((result)=>{
                this.id             =result.data.id;
                this.name           =result.data.name;   
                this.last_name      =result.data.last_name; 
                this.gender         =result.data.gender;
                this.date_of_birth  =result.data.date_of_birth; 
                this.phone          =result.data.phone;         
                this.email          =result.data.email;
                this.grade          =result.data.grade;
                this.group          =result.data.group;
                
                
                this.loaded         = true;
})
               
            .catch(()=>{
                alert("consulta no exitosa");
                
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
    
        },






        

        created: async function(){
        this.getData();
},
 
     },
}



</script>

<style>
.information{
margin-left: 10px;
padding: 0%;
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: left;
align-items: left;
}

.information h1{
font-size: 50px;
color: #0f1316;
}
.information h2{
font-size: 20px;
color: #283747;
}
.information span{
color: crimson;
font-weight: bold;
}


.signUp_userc{
        margin-left:0%;
        padding: 0%;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container_signUp_userc {
        margin:10px;
        border-radius: 10px;
        width: 50%;
        height: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .signUp_userc h2{
        color: #283747;
    }

    .signUp_userc form{
        width: 70%;
    }

    .signUp_userc input{
        height: 40px;
        width: 30%;
        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;
        border: 1px solid #283747;
    }

    .signUp_userc button{
        width: 30%;
        height: 40px;
        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;
        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;
    }

    .signUp_userc button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }
</style>

