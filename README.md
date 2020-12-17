# Sandy-Beach-Estimator
This file explains the procedures to estimate beach area based on the Landsat 7 collection using the methodology from Orlando 2021 (unpublished). A step by step modification in order to make the script adaptable to any beach follows below. 
The script works as an example with the intention of making the work replicable, on the example two beaches of the Montevideo coast are measured: "verde" and "rochita"
Open the "BeachAreaMontevideo.js" script copy and paste on Google Earth Engine javascript.

To modify and use the script for detecting other sites area:
1. Create beach polygons, using the geometry functions of GEE and the satellite visualization, modify the names "verde" and "rochita" in the script to fit your beaches
2. Select training areas for "sand","urban" and "misc" by creating at least one polygon per class.
3. Change the geographic location point and map center coordinates on lines #23 and #26 respectively (you can regulate the zoom modifying the third argument of the Map.setCenter function)
4. Run the script
5. Check the quality of the image, if too cloudy modify the Cloud score range (csr) and rerun until a clear image is achieved
6. Use the slider on the "Mosaic" layer of the visualization to check the differences with the "Mosaic - NDWI" layer, in this way you can visually check the fit of the water threshold value (wth), modify wth and rerun until a good performance is achieved.
7. Visualize the "Mosaic - NDWI" and "Sand Classified" layers and use the slider to visually check the accuracy of the sand classification, you can modify the classification threshold (cth) to improve accuracy, but mind the implications of modifying the classification parameter when comparing several years
8. Visualize the "Mosaic - NDWI" and "NDVI>vth" layers and use the slider to check the accuracy of the vegetation classification
9. If satisfied with the results open the task tab and excecute the export of the data or retrieve it from the results list on the console

You can access the database of beach area for the coast of Montevideo (1984-2019) at: 10.5281/zenodo.4327667
