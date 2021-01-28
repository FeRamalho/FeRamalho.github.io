require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Home",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Slider",
    "esri/Graphic",
    "esri/widgets/Fullscreen"
  ], function (Map, MapView, Home, FeatureLayer, GraphicsLayer, Slider, Graphic, Fullscreen) {
    
    var template = {
        title: "Informações",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "nome",
                label: "Nome"
              },
              {
                fieldName: "expiration",
                label: "Existe até"
              }
            ]
          }
        ]
      };

    var featureLayer = new FeatureLayer({
        portalItem: {
            id: "6dca5b9b8fc8491d852dcd6fb260359d"
        },
        //url: "https://services7.arcgis.com/1cZoQRHeAYtnln4n/arcgis/rest/services/1991mun/FeatureServer",
        definitionExpression: "begin_date <= 1970 and expiration >= 1970",
        popupTemplate: template,
        outFields: "*"
    });

    var resultsLayer = new GraphicsLayer();
    
    var map = new Map({
        //basemap: "dark-gray"
        layers: [featureLayer]
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        //center: [-118.80500,34.02700],
        //zoom: -13
    });

    map.add(featureLayer);
    
    // Layer used to draw graphics returned
    // var graphicsLayer = new GraphicsLayer();
      //map.add(graphicsLayer);

    var applicationDiv = document.getElementById("applicationDiv");
    var sliderValue = document.getElementById("sliderValue");
    var playButton = document.getElementById("playButton");
    var titleDiv = document.getElementById("titleDiv");
    var animation = null;

    var slider = new Slider({
      container: "slider",
      min: 1872,
      max: 1991,
      values: [1970],
      step: [1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991],
      label: [1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991],
      visibleElements: {
          labels: true,
          rangeLabels: true,
      },
      steps: [1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991],
      precision: 1,
      tickConfigs: [{
        mode: "position",
        values: [1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991],
        labelsVisible: true
      }],
    });
  
    slider.labelFormatFunction = function(value, type) {
        return (type === "value") ? value.toFixed(0) : value;
    }

    
  
//map.addMany([resultsLayer, featureLayer]);

    // When user drags the slider:
    //  - stops the animation
    //  - set the visualized year to the slider one.
    function inputHandler(event) {
      stopAnimation();
      setYear(event.value);
    }
    slider.on("thumb-drag", inputHandler);

    // Toggle animation on/off when user
    // clicks on the play button
    playButton.addEventListener("click", function() {
      if (playButton.classList.contains("toggled")) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });

    view.ui.empty("top-left");
    view.ui.add(titleDiv, "top-left");
    view.ui.add(
        new Home({
            view: view
        }),
        "top-left"
    );
    //view.ui.add(
    //  new Legend({
    //      view: view
    //  }),
    //  "bottom-left"
    //);
    view.ui.add(
        new Fullscreen({
            view: view,
            element: applicationDiv
        }),
        "top-right"
    );

    // When the layerview is available, setup hovering interactivity
    //view.whenLayerView(featureLayer).then(setupHoverTooltip);

    // Starts the application by visualizing year 1970
    setYear(1970);

     /**
     * Sets the current visualized construction year.
     */
    function setYear(value) {
        sliderValue.innerHTML = Math.floor(value);
        slider.viewModel.setValue(0, value);
        //featureLayer.renderer = createRenderer(value);
        queryMun(value).then(displayResults)
        //selectFilter.addEventListener('change', function (event) {
      //setFeatureLayerFilter(value);
    //});
    }
    function setFeatureLayerFilter(expression) {
        featureLayer.definitionExpression = expression;
    }

    function displayResults(results) {
        resultsLayer.removeAll();
        var features = results.features;
        resultsLayer.addMany(features);
    }

    function queryMun(value) {
        var query = featureLayer.createQuery();
      
        featureLayer.definitionExpression = `begin_date <= ${value} and expiration >= ${value}`;
        query.outFields = ["*"];

        return featureLayer.queryFeatures(query);
    }


      /**
       * Returns a renderer with a color visual variable driven by the input
       * year. The selected year will always render buildings built in that year
       * with a light blue color. Buildings built 20+ years before the indicated
       * year are visualized with a pink color. Buildings built within that
       * 20-year time frame are assigned a color interpolated between blue and pink.
       */
    function createRenderer(year) {
        var opacityStops = [
          {
              opacity: 1,
              value: year
          },
          {
              opacity: 0,
              value: year + 1
          }
        ];

        return {
            type: "simple",
            symbol: {
                type: "simple-fill",
                color: "rgb(0, 0, 0)",
                outline: null
            },
            visualVariables: [
              {
                  type: "opacity",
                  field: "begin_date",
                  stops: opacityStops,
                  legendOptions: {
                      showLegend: false
                  }
              },
              {
                  type: "color",
                  field: "begin_date",
                  legendOptions: {
                      title: "Built:"
                  },
                  stops: [
                    {
                        value: year,
                        color: "#0ff",
                        label: "in " + year
                    },
                    {
                        value: year - 10,
                        color: "#f0f",
                        label: "in " + (year - 20)
                    },
                    {
                        value: year - 50,
                        color: "#404",
                        label: "before " + (year - 50)
                    }
                  ]
              }
            ]
        };
    }

      /**
       * Sets up a moving tooltip that displays
       * the construction year of the hovered building.
       */
    function setupHoverTooltip(layerview) {
        var hitTestPromise;
        var highlight;

        var tooltip = createTooltip();

        view.on("pointer-move", function (event) {
            var promise = (hitTestPromise = view
              .hitTest(event)
              .then(function (hit) {
                  if (promise !== hitTestPromise) {
                      // another hit test was performed, ignore this result
                      return;
                  }

                  // remove current highlighted feature
                  if (highlight) {
                      highlight.remove();
                      highlight = null;
                  }

                  var results = hit.results.filter(function (result) {
                      return result.graphic.layer === layer;
                  });

                  // highlight the hovered feature
                  // or hide the tooltip
                  if (results.length) {
                      var graphic = results[0].graphic;
                      var screenPoint = hit.screenPoint;

                      highlight = layerview.highlight(graphic);
                      tooltip.show(
                        screenPoint,
                        "Built in " + graphic.getAttribute("begin_date")
                      );
                  } else {
                      tooltip.hide();
                  }
              }));
        });
    }


    /**
    * Starts the animation that cycle
    * through the construction years.
    */
    function startAnimation() {
        stopAnimation();
        animation = animate(slider.values[0]);
        playButton.classList.add("toggled");
    }

    /**
    * Stops the animations
    */
    function stopAnimation() {
        if (!animation) {
            return;
        }

        animation.remove();
        animation = null;
        playButton.classList.remove("toggled");
    }

    /**
    * Animates the color visual variable continously
    */
    function animate(startValue) {
        var animating = true;
        var value = startValue;
        var array = [1872, 1900, 1911, 1920, 1933, 1940, 1950, 1960, 1970, 1980, 1991];
        var indexValue;

        var frame = function (timestamp) {
            if (!animating) {
                return;
            }

            indexValue = array.indexOf(value);
            value = array[++indexValue];

            if (value === undefined) {
                value = 1872;
            }

            setYear(value);

            // Update at 30fps
            setTimeout(function () {
                requestAnimationFrame(frame);
            }, 5500);
        };

        frame();

        return {
            remove: function () {
                animating = false;
            }
        };
    }

    /**
    * Creates a tooltip to display a the construction year of a building.
    */
    function createTooltip() {
        var tooltip = document.createElement("div");
        var style = tooltip.style;

        tooltip.setAttribute("role", "tooltip");
        tooltip.classList.add("tooltip");

        var textElement = document.createElement("div");
        textElement.classList.add("esri-widget");
        tooltip.appendChild(textElement);

        view.container.appendChild(tooltip);

        var x = 0;
        var y = 0;
        var targetX = 0;
        var targetY = 0;
        var visible = false;

        // move the tooltip progressively
        function move() {
            x += (targetX - x) * 0.1;
            y += (targetY - y) * 0.1;

            if (Math.abs(targetX - x) < 1 && Math.abs(targetY - y) < 1) {
                x = targetX;
                y = targetY;
            } else {
                requestAnimationFrame(move);
            }

            style.transform =
                "translate3d(" + Math.round(x) + "px," + Math.round(y) + "px, 0)";
        }

        return {
            show: function (point, text) {
                if (!visible) {
                    x = point.x;
                    y = point.y;
                }

                targetX = point.x;
                targetY = point.y;
                style.opacity = 1;
                visible = true;
                textElement.innerHTML = text;

                move();
            },

            hide: function () {
                style.opacity = 0;
                visible = false;
            }
        };
    }


    //var sqlExpressions = ["begin_date = 1872", "begin_date = 1991", "expiration = 1872", "expiration = 1940"];

    //var selectFilter = document.createElement("select");
    //selectFilter.setAttribute("class", "esri-widget esri-select");
    //selectFilter.setAttribute("style", "width: 275px; font-family: Avenir Next W00; font-size: 1em;");

    //sqlExpressions.forEach(function(sql){
    //  var option = document.createElement("option");
    //  option.value = sql;
    //  option.innerHTML = sql;
    //  selectFilter.appendChild(option);
    //});

    //view.ui.add(selectFilter, "top-right");
    
    //function setFeatureLayerFilter(expression) {
    //  featureLayer.definitionExpression = expression;
    //}
    
    //selectFilter.addEventListener('change', function (event) {
    //  setFeatureLayerFilter(event.target.value);
    //});

});