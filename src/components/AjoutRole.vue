<template>
  <div class = "formulaire">
    <h1 style="font-family: 'Baskerville Old Face'; font-weight: bold; font-size: 1.8em; margin-top: 0px; margin-bottom: 1em;color: #5c6161;text-align: center;">Ajout d'un rôle à {{prenomActor}} {{nomActor}}</h1>
    <form v-on:submit.prevent="prevent" method="post">
      <input type="hidden" id="noAct" name="noAct" ref="noAct" :value="noAct">
      <div class = "user-box">
              <label for="nomRole">Rôle occupé :</label>
              <input required type="text" id="nomRole" name="nomRole" ref="nomRole" v-model = "nomRole" placeholder="Nom du personnage joué">
          </div>
          <div class = "user-box">
              <label for="noFilm">Film</label>
              <select required id="selectFilm" name="selectFilm" ref="selectFilm" v-model="idAndTitle" placeholder="Sélectionnez un film">
                <option value="" disabled selected>Choisissez le film...</option>
                <option id="noFilm" name="noFilm" v-for="option in idsAndTitles" v-bind:key="option.title" v-bind:value="option.noFilm">{{ option.titre }}</option>
              </select>
          </div>
          <input type="Submit" value="Ajouter">
      </form>
      <div id="feedback" class="feedback"></div>
  </div>
</template>
    
<script>

import axios from 'axios';
export default {
  name: "AjoutRoleComponent",
    data() {
      return {
        noAct: -1,
        nomActor:"None",
        prenomActor:"None",
        noFilm:-1,
        nomRole : "",
        idsAndTitles:null,
        idAndTitle:null,
        newPersonnage:new Object()
        }
    },
    beforeMount () {
      axios
          .get('http://localhost:8080/GetActeur/'+this.$route.params.idActor, {headers : {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"}})
          .then(response => {
            var actor_data = response.data
            this.noAct = actor_data.noAct
            this.nomActor = actor_data.nom
            this.prenomActor = actor_data.prenom})
          .catch(err => {
            console.log("Unable to fetch actor to add a new role")
            console.log(err);});
      axios
        .get('http://localhost:8080/GetFilms', {headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }})
        .then(response => {
          var movies_data = response.data
          var movies_ids_and_titles = []
          var movie_idx
          for (movie_idx = 0; movie_idx < movies_data.length; movie_idx++){
            var movie = movies_data[movie_idx]
            movies_ids_and_titles.push(
              {
                "noFilm" : movie.noFilm,
                "titre" : movie.titre
              })
          }
          this.idsAndTitles = movies_ids_and_titles
          })
        .catch(err => {
          console.log(err.response);
        });
  },
  methods:{
      prevent(){
        this.newPersonnage.noFilm = document.getElementById("selectFilm").value
        this.newPersonnage.noAct = document.getElementById("noAct").value
        this.newPersonnage.nomPers = document.getElementById("nomRole").value
        axios
          .post('http://localhost:8080/AddPersonnage',this.newPersonnage, {headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"}})
          .then(response => {
            var status = response.status
            if (status == 200) {
              document.getElementById("feedback").innerHTML = "<div style='color:#00C103'><div class=\"lds-roller\" style='margin-left:45%; width:10%'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div style='margin-left:30%; width:40%; text-align:center'>Ajout effectué, redirection</div></div>"
              setTimeout( () => this.$router.push({name : "roles"}), 1500);}
            else {
              document.getElementById("feedback").innerHTML = "<div style='color:#c4003b'><div class=\"lds-roller\" style='margin-left:45%; width:10%'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div style='margin-left:30%; width:40%; text-align:center'>Une erreur est survenue, redirection</div></div>"
              setTimeout(() => this.$router.push({name: "roles"}), 1500);}})
        console.log(this.newPersonnage)
      }
  }
}
/*
window.onload = function() {
  console.log(movies_titles)
  var title_idx
  var select_elt = document.getElementById("film");
  //var select_elt_inner = select_elt.innerHTML;
  for(title_idx = 0; title_idx < movies_titles.length; title_idx++) {
    var option_elt = document.createElement("OPTION");
    option_elt.id = "noFilm"
    option_elt.name = "noFilm"
    option_elt.value = movies_titles[title_idx].noFilm
    option_elt.innerHTML = movies_titles[title_idx].titre
    //select_elt_inner += "<option id=\"noFilm\" name=\"noFilm\" value=\""+movies_titles[title_idx].noFilm+"\">"+movies_titles[title_idx].titre+"</option>"
    select_elt.appendChild(option_elt)
  }
}*/
</script>
