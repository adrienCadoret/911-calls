# 911 Calls avec ElasticSearch

## Création de l'index et du mapping
Sous kibana entrer les commandes suivantes :

```
PUT 911-calls

PUT /911-calls/calls/_mapping
{ 
  "calls": {
    "properties": {
      "location": {
        "type": "geo_point"
      },
      "timestamp": {
        "type": "date"
      }
    }
  }
}
```

## Import du jeu de données

Pour importer le jeu de données, complétez le script `import.js` (ici aussi, cherchez le `TODO` dans le code :wink:).

Exécutez-le ensuite :

```bash
npm install
node import.js
```

Vérifiez que les données ont été importées correctement grâce au shell (le nombre total de documents doit être `153194`) :

```
GET 911-calls/calls/_count
```

## Requêtes

### Compter le nombre d'appels autour de Lansdale dans un rayon de 500 mètres
```
GET /911-calls/calls/_search
{
  "query": {
    "bool": {
      "must": {
        "match_all": {}
      },
      "filter": {
        "geo_distance": {
          "distance": "500m",
          "location": {
            "lat": 40.241493,
            "lon": -75.283783
          }
        }
      }
    }
  }
}
```

### Compter le nombre d'appels par catégorie
```
```

## Kibana

Dans Kibana, créez un dashboard qui permet de visualiser :

* Une carte de l'ensemble des appels
* Un histogramme des appels répartis par catégories
* Un Pie chart réparti par bimestre, par catégories et par canton (township)

Pour nous permettre d'évaluer votre travail, ajoutez une capture d'écran du dashboard dans ce répertoire [images](images).

### Timelion
Timelion est un outil de visualisation des timeseries accessible via Kibana à l'aide du bouton : ![](images/timelion.png)

Réalisez le diagramme suivant :
![](images/timelion-chart.png)

Envoyer la réponse sous la forme de la requête Timelion ci-dessous:  

```
TODO : ajouter la requête Timelion ici
```
