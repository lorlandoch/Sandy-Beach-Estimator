# Sandy-Beach-Estimator
Open GEE scripts and procedures to estimate beach area based on the Landsat 7 collection
This script works as an example with the intention of making the work replicable, on the example two beaches of the Montevideo coast are measured: "verde" and "rochita"

To modify and use the script for detecting other sites area:
1. Beach polygon. Create beach polygons, using the geometry functions of GEE and the satellite visualization, modify the names "verde" and "rochita" in the script to fit your beaches
2. Select training areas for "sand","urban" and "misc".
3. Change the geographic location point and map center coordinates on lines #23 and #26 respectively (you can regulate the zoom modifying the third argument of the Map.setCenter function)
4. Run the script
5. Check the quality of the image, if too cloudy modify the Cloud score range (csr) and rerun until a clear image is achieved
6. Use the slider on the "Mosaic" layer of the visualization to check the differences with the "Mosaic - NDWI" layer, in this way you can visually check the fit of the water threshold value (wth), modify wth and rerun until a good performance is achieved.
7. Visualize the "Mosaic - NDWI" and "sand" layers and use the slider to visually check the accuracy of the sand classification, you can modify the classification threshold (cth) to improve accuracy, but mind the implications of modifying the classification parameter when comparing several years
8. Visualize the "Mosaic - NDWI" and "NDVI<vth" layers and use the slider to check the accuracy of the vegetation classification
9. If satisfied with the results open the task tab and excecute the export of the data or retrieve it from the results list on the console
