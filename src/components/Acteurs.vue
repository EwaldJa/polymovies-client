<template>

  <div id="app">
    <h1 style="font-family: 'Baskerville Old Face'; font-weight: bold; font-size: 2.2em; margin-top: 1em;color: #5c6161;text-align: center;">Liste des acteurs et de leurs rôles</h1>
    <vue-good-table :columns="columns" :rows="rows" :row-style-class="rowStyleClassFn" :search-options="{enabled: true}" @on-cell-click="onCellClick" >
    </vue-good-table>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "ActeursComponent",
  data() {
    var rows = null
    return {
      rows,
      columns: [
        {
          label: "ID",
          field: "id_acteur",
          filterable: false,
          hidden: true
        },
        {
          label: "Prénom",
          field: "prenom_acteur",
          filterable: true,
          type: 'String'
        },
        {
          label: "Nom",
          field: "nom_acteur",
          filterable: true,
          type: 'String'
        },
        {
          label: "Date de naissance",
          field: "naissance_acteur",
          filterable: false,
          type: 'date',
          dateInputFormat:'yyyy-MM-dd',
          dateOutputFormat: 'do MMM yyyy'
        },
        {
          label: "Date de décès",
          field: "deces_acteur",
          filterable: false,
          type: 'date',
          dateInputFormat:'yyyy-MM-dd',
          dateOutputFormat: 'do MMM yyyy'
        },
        {
          label: "Rôles",
          field: "persos_acteur",
          filterable: true,
          type: 'String'
        },
        {
          label: "Ajout",
          field: "ajout_role",
          filterable: false,
          html: true
        }
      ]
    };
  },
  beforeMount () {
    /*
    var movies_titles = [];
    axios
      .get('http://localhost:8080/GetFilms', {headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"}})
      .then(response => {
        var movies_data = response.data
        var movie_idx
        for (movie_idx = 0; movie_idx<movies_data.length; movie_idx++){
          movies_titles.push(movies_data[movie_idx].titre)}})
      .catch(err => {
        console.log("Unable to fetch movies list for actors display")
        console.log(err);});
    */
    axios
      .get('http://localhost:8080/GetActeurs', {headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"}})
      .then(response => {
        var actors_data = response.data
        var actors_display = []
        var actor_idx
        for (actor_idx = 0; actor_idx<actors_data.length; actor_idx++){
          var actor = actors_data[actor_idx]
          var actor_roles_display = ""
          var role_idx
          for (role_idx = 0; role_idx< actor.personnageList.length; role_idx++){
            var role_j = actor.personnageList[role_idx]
              if (role_idx > 0){
                actor_roles_display += ", "}
                actor_roles_display += role_j.nom
                actor_roles_display += " ["+ role_j.filmByFilmId.titre + "]"}
          var dateNaissance_str = "" + actor.dateNaissance
          var dateNaissance_disp = (dateNaissance_str === "null")?null:dateNaissance_str.split("T")[0]
          var dateDeces_str = "" + actor.dateDeces
          var dateDeces_disp = (dateDeces_str === "null")?null:dateDeces_str.split("T")[0]
          actors_display.push({
            "id_acteur" : actor.noAct,
            "prenom_acteur" : actor.prenom,
            "nom_acteur" : actor.nom,
            "naissance_acteur": dateNaissance_disp,
            "deces_acteur": dateDeces_disp,
            "persos_acteur": actor_roles_display,
            "ajout_role": "<i class=\"gg-add\" style='cursor: pointer;'></i>"})}
        this.rows = actors_display})
      .catch(err => {
        console.log("Unable to properly display actors")
        console.log(err);});
  },
  methods:{
    onCellClick (params){
      if(params.column.label == "Ajout") {
        this.$router.push({name : "ajoutRole", params: {idActor: params.row.id_acteur}})
      }
    },
    rowStyleClassFn() {
      return 'VGT-row';
    }
  }
};

</script>