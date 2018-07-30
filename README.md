
## NYC Bike Sharing Real Time Dashboard

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    components/
      header/
        index.js
        header.css
      charts/
        index.js
        charts.css
      gmap/
        marker/
          index.js
          marker.css
        customInfoWindow/
          index.js
          customInfoWindow.css
        index.js
        gmap.css
    services/
      index.js
      request.js
      request.test.js
    shared/
      index.js
      utils.js
      utils.test.js      
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## Installing a Dependency

```sh
npm install --save react-router
```

Alternatively you may use `yarn`:

```sh
yarn add react-router
```
## Description

![dashboard](https://i.imgur.com/H4Kg6sV.png)

1 form for searching the city with distance(by default 2km)
4 cards in dashboard
  2 for charts 
    -> Current usage of stations
    -> Historical usage of stations (8 min) 
  2 for map
    -> station (map with markers)
    -> Search based stations (when user search the station in form map is set according to the input fields)


  - **Current usage of stations**: Display the current usage of station, At first when app loads it display the usage of all stations, You have an option to select a specific station from dropdown above the graph.

  - **Historical usage of stations**: Display the historical usage of stations min by min, this is a 8 min cycle historical usage of a station. At first it sets the current status to every min, after that at every min it updates 

  - **Stations**: Display the markers on the map based on the bikes available on the station

    Red -> No free bikes

    Orange -> Less than 50% bikes available

    Green -> Greater than 75% bikes available

  - **Search based stations**: Same as the sations map but it updates whenever the form submitted. Click on the marker open an infowindow in which the statistics are displayed.

  - **Search Form**: Two fields in search form, station and distance, by default the distance is 2km, whenever user submitted the form 3 cards(Current usage of stations ,Historical usage of stations (8 min), Search based stations) are update based on the submitted data
    