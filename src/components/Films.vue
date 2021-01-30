<template>

  <div id="app">
    <h1 style="font-family: 'Baskerville Old Face'; font-weight: bold; font-size: 2.2em; margin-top: 1em;color: #5c6161;text-align: center;">Liste des films de Poly'Movie</h1>
    <vue-good-table :columns="columns" :rows="rows" :row-style-class="rowStyleClassFn" :fixed-header="true" :search-options="{enabled: true}" >
    </vue-good-table>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "FilmsComponent",
  data() {
    var rows = null
    return {
      component:"None",
      rows,
      columns: [
        {
          label: "Titre",
          field: "titre_film",
          filterable: true,
        },
        {
          label: "Durée",
          field: "duree_film",
          filterable: true,
          type: 'number'
        },
        {
          label: "Date sortie",
          field: "sortie_film",
          filterable: true,
          type: 'date',
          dateInputFormat:'yyyy-MM-dd',
          dateOutputFormat: 'do MMM yyyy'
        },
        {
          label: "Budget",
          field: "budget_film",
          filterable: true,
          type: 'number'
        },
        {
          label: "Montant recette",
          field: "recette_film",
          filterable: true,
          type: 'number'
        },
        {
          label: "Réalisateur",
          field: "realisateur_film",
          filterable: true,
        },
        {
          label: "Catégorie",
          field: "categorie_film",
          filterable: true,
        }
      ]
    };
  },
  beforeMount () {
    axios
      .get('http://localhost:8080/GetFilms', {headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }})
      .then(response => {
        var movies_data = response.data
        var movies_display = []
        var movie_idx
        for (movie_idx = 0; movie_idx < movies_data.length; movie_idx++){
          var movie = movies_data[movie_idx]
          var dateSortie_str = "" + movie.dateSortie
          var dateSortie_disp = (dateSortie_str === "null")?null:dateSortie_str.split("T")[0]
          movies_display.push(
            {
              "id_film" : movie.noFilm,
              "titre_film" : movie.titre,
              "duree_film" : movie.duree,
              "sortie_film": dateSortie_disp,
              "budget_film": movie.budget,
              "recette_film": movie.recette,
              "realisateur_film": movie.realisateurByRealisateurId.prenom + " " + movie.realisateurByRealisateurId.nom,
              "categorie_film": movie.categorieByCategorieId.libelle + " [" + movie.categorieByCategorieId.code + "]"
            })
        }
        this.rows = movies_display
        })
      .catch(err => {
        console.log(err.response);
      });
  },
  methods:{
    rowStyleClassFn() {
      return 'VGT-row';
    },
  }
};
</script>
