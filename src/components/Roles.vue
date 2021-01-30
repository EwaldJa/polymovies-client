<template>
  <div id="app">
    <h1 style="font-family: 'Baskerville Old Face'; font-weight: bold; font-size: 2.2em; margin-top: 1em;color: #5c6161;text-align: center;">Les rôles</h1>
    <vue-good-table :columns="columns" :rows="rows" :row-style-class="rowStyleClassFn" :search-options="{ enabled: true }" @on-cell-click="onCellClick">
    </vue-good-table>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "RolesComponent",
  data() {
    var rows = null
    return {
      rows,
      columns: [
        {
          label: "ID Acteur",
          field: "id_acteur",
          filterable: false,
          hidden: true
        },
        {
          label: "ID Film",
          field: "id_film",
          filterable: false,
          hidden: true
        },
        {
          label: "Nom personnage",
          field: "nom_role",
          filterable: true
        },
        {
          label: "Film",
          field: "film_role",
          filterable: true
        },
        {
          label: "Acteur",
          field: "acteur_role",
          filterable: true
        },
        {
          label: "Ajouter",
          field: "ajout_role",
          filterable: false,
          html: true
        },
        {
          label: "Modifier",
          field: "modifier_role",
          filterable: false,
          html: true
        },
        {
          label: "Supprimer",
          field: "supprimer_role",
          filterable: false,
          html: true
        }
      ]
    };
  },
  beforeMount () {
    axios
      .get('http://localhost:8080/GetPersonnages', {headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }})
      .then(response => {
        var roles_data = response.data
        var roles_display = []
        var role_idx
        for (role_idx = 0; role_idx < roles_data.length; role_idx++){
          var role = roles_data[role_idx]
          roles_display.push(
            {
              "nom_role" : role.nom,
              "id_acteur" : role.noAct,
              "acteur_role" : role.acteurByActeurId.prenom + " " + role.acteurByActeurId.nom,
              "id_film" : role.noFilm,
              "film_role" : role.filmByFilmId.titre,
              "ajout_role": "<i class=\"gg-add\" style='cursor: pointer;'></i>",
              "modifier_role": "<i class=\"gg-pen\" style='cursor: pointer;'></i>",
              "supprimer_role": "<i id='del#"+role.noAct+"-"+role.noFilm+"' class=\"gg-trash\" style='cursor: pointer;'></i>"
            })
        }
        this.rows = roles_display
        })
      .catch(err => {
        console.log(err.response);
      });
  },
  methods:{
    rowStyleClassFn() {
      return 'VGT-row';
    },
    onCellClick (params){
      switch (params.column.label) {
        case "Ajouter":
          this.$router.push({name : "ajoutRole", params: {idActor: params.row.id_acteur}})
          break;
        case "Modifier":
          this.$router.push({name : "modifierRole", params: {nomRole: params.row.nom_role, idActor: params.row.id_acteur, nomActeur: params.row.acteur_role, idFilm: params.row.id_film, nomFilm: params.row.film_role}})
          break;
        case "Supprimer":
          var delete_elt = document.getElementById("del#"+params.row.id_acteur+"-"+params.row.id_film)
          if(delete_elt.className == "gg-trash") {
            delete_elt.className = "confirm-delete"
            delete_elt.innerText = "Confirmer"
          }
          else {
            axios
              .delete('http://localhost:8080/DeletePersonnage?NoAct='+params.row.id_acteur+'&NoFilm='+params.row.id_film)
            this.$router.go()
          }
          break;

      }
    },
  }
};
</script>
