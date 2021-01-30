<template>
  <div class = "formulaire">
    <h1 style="font-family: 'Baskerville Old Face'; font-weight: bold; font-size: 1.8em; margin-top: 0px; margin-bottom: 1em;color: #5c6161;text-align: center;">Modification d'un rôle existant</h1>
    <form v-on:submit.prevent="prevent" method="post">
      <div class = "user-box">
        <label for="noActor">Acteur</label>
        <select required id="selectActor" name="selectActor" ref="selectActor" v-model="idAndName">
          <option value="" disabled>Précédemment : {{nomCompletActeur}}</option>
          <option id="noActor" name="noActor" v-for="acteur in idsAndNames" v-bind:key="acteur.nomCompletActeur" v-bind:value="acteur.idActeur">{{ acteur.nomCompletActeur }}</option>
        </select>
      </div>
      <input type="hidden" id="oldNoAct" name="oldNoAct" ref="oldNoAct" :value="oldNoAct">
      <input type="hidden" id="oldNoFilm" name="oldNoFilm" ref="oldNoFilm" :value="oldNoFilm">
      <div class = "user-box">
        <label for="nomRole">Rôle occupé :</label>
        <input required type="text" id="nomRole" name="nomRole" ref="nomRole" v-model = "nomRole" :placeholder="nomRolePlaceholder">
      </div>
      <div class = "user-box">
        <label for="noFilm">Film</label>
        <select required id="selectFilm" name="selectFilm" ref="selectFilm" v-model="idAndTitle">
          <option value="" disabled>Précédemment : {{nomFilm}}</option>
          <option id="noFilm" name="noFilm" v-for="option in idsAndTitles" v-bind:key="option.titre" v-bind:value="option.noFilm">{{ option.titre }}</option>
        </select>
      </div>
      <input type="Submit" value="Modifier">
    </form>
    <div id="feedback" class="feedback"></div>
  </div>
</template>
<script>

import axios from 'axios';
export default {
  name: "ModifierRoleComponent",
  data() {
    return {
      noAct: this.$route.params.idActor,
      oldNoAct: this.$route.params.idActor,
      nomCompletActeur: this.$route.params.nomActeur,
      noFilm: this.$route.params.idFilm,
      oldNoFilm: this.$route.params.idFilm,
      nomFilm: this.$route.params.nomFilm,
      nomRole : this.$route.params.nomRole,
      nomRolePlaceholder : "Précédemment : " + this.$route.params.nomRole,
      idsAndNames: null,
      idAndName: null,
      idsAndTitles:null,
      idAndTitle:null,
      newPersonnage:new Object()
    }
  },
  beforeMount () {
    axios
        .get('http://localhost:8080/GetActeurs/', {headers : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"}})
        .then(response => {
          var actors_data = response.data
          var actors_disp = []
          var actor_idx
          for (actor_idx = 0; actor_idx<actors_data.length; actor_idx++){
            var actor = actors_data[actor_idx]
            actors_disp.push({
              "nomCompletActeur": actor.prenom + " " + actor.nom,
              "idActeur": actor.noAct
            })
          }
          this.idsAndNames = actors_disp
          this.idAndName = {
            "nomCompletActeur": this.$route.params.nomActeur,
            "idActeur": this.$route.params.idActor }})
        .catch(err => {
          console.log("Unable to fetch actors list to modify a role")
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
            movies_ids_and_titles.push({
              "noFilm" : movie.noFilm,
              "titre" : movie.titre})}
          this.idsAndTitles = movies_ids_and_titles
          this.idAndTitle = {
            "noFilm" : this.$route.params.idFilm,
            "titre" : this.$route.params.nomFilm}
        })
        .catch(err => {
          console.log(err.response);
        });
  },
  methods:{
    prevent(){
      this.newPersonnage.oldNoFilm = document.getElementById("oldNoFilm").value
      this.newPersonnage.oldNoAct = document.getElementById("oldNoAct").value
      this.newPersonnage.noFilm = document.getElementById("selectFilm").value
      this.newPersonnage.noAct = document.getElementById("selectActor").value
      this.newPersonnage.nomPers = document.getElementById("nomRole").value
      axios
          .put('http://localhost:8080/UpdatePersonnage',this.newPersonnage, {headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"}})
          .then(response => {
            var status = response.status
              if (status == 200) {
                document.getElementById("feedback").innerHTML = "<div style='color:#00C103'><div class=\"lds-roller\" style='margin-left:45%; width:10%'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div style='margin-left:30%; width:40%; text-align:center'>Modification effectuée, redirection</div></div>"
                setTimeout( () => this.$router.push({name : "roles"}), 1500);
              }
              else {document.getElementById("feedback").innerHTML = "<div style='color:#c4003b'><div class=\"lds-roller\" style='margin-left:45%; width:10%'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><div style='margin-left:30%; width:40%; text-align:center'>Une erreur est survenue, redirection</div></div>"
                setTimeout( () => this.$router.push({name : "roles"}), 1500);
              }
            })
      console.log(this.newPersonnage)
    }
  }
}

</script>