# Estimación del area en playas arenosas

Este documento explica el procedimiento para estimar el area de playa, basado en la coleccion Landsat 7 , usando la metodología de Orlando 2021 (sin publicar).
A continuación se detalla el procedimiento  paso a paso para adaptar el script a cualquier playa de interés. Este script funciona como un ejemplo con la intención de permitir replicar
el trabajo, en el ejemplo la playa "beach1" de la costa de Montevideo es medida a traves del script. Copie el texto  de "BeachAreaEstimator.js" y peguelo en la terminal javascript 
de Google Earth Engine (GEE)

Para modificar y usar el script en esta u otras areas: 

    1. Crear un polígono para "beach1", usando las herramientas de geometría de GEE, puede usar diferentes nombres de playa si cambia "beach1" en el script para que coincida con el nombre 
    del polígono de playa
    2. Seleccione las areas de entrenamiento para "sand" (arena) y "other" (otro) creando al menos un poligono por clase
    3. Cambie el punto de ubicacion geografica (point) y las cordenadas de visualizacion del mapa en la lineas #23 and #26 respectivamente 
    (puede regular el zoom de la visualizacion modificando el tercer argumento de la funcion Map.setCenter)
    4. Ejecute (Run) el script
    5. Verifique la calidad de la imagen, si hay demasiada nubosidad modifique el Cloud score range (csr) y vuelva a ejecutar hasta lograr una imagen clara
    6. Usando el selector en la capa "Mosaic" de la visualizacion verifique las diferencias con la capa "Mosaic - NDWI", de esta manera puede chequear visualmente 
    el ajuste del umbral de NDWI (wth), modifique y re ejecute hasta que lograr un resultado aceptable
    7. Revise las áreas de entrenamiento usando la capa "Mosaic - NDWI" (es la que se usara para clasificar), si modifico las areas re ejecture el script
    8. Revise las diferencias entre las capas "Mosaic - NDWI" y "Sand Classified", use el selector para verificar la precision de la deteccion de arena,
    si el resultado no es satisfactorio se puede modificar el umbral de clasificacion (cth), pero tenga en cuenta que esto puede limitar comparaciones entre medidas con distinto cth
    9. Revise "Mosaic - NDWI" y "NDVI>vth" usando el selecto para chequear la precision de la clasificacion de vegetacion
    10. Si los resultados son aceptados abra la viñeta "task" y ejecute la exportacion de los datos a su Google Drive u obtenga los datos de la lista "results" en la consola

Puede acceer a la base de datos de area de playa para la costa de Montevideo (1984-2019) en: http://doi.org/10.5281/zenodo.4327667

Para usar la colleccion Landsat 5:

    Cambie la variable "bands" en la linea #16 para: var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
    Modifique la variable "collection" cambiando la linea #29 para: var collection = ee.ImageCollection('LANDSAT/LT5_L1T')
