# Sandy-Beach-Estimator
This file explains the procedures to estimate beach area based on the Landsat 7 collection using the methodology from Orlando 2021 (unpublished). A step by step modification guide in order to make the script adaptable to any beach follows below. 
The script works as an example with the intention of making the work replicable, on the example a beach "beach1" of the Montevideo coast is measured, 
open the "BeachAreaEstimator.js" script copy and paste on Google Earth Engine javascript terminal.

To modify and use the script for detecting other sites area:
1. Create the beach polygon for "beach1", using the geometry functions of GEE and the satellite visualization, you can use custom beach names if you change "beach1" in the script to fit your beach polygon name
2. Select training areas for "sand","urban" and "misc" by creating at least one polygon per class.
3. Change the geographic location point and map center coordinates on lines #23 and #26 respectively (you can regulate the zoom modifying the third argument of the Map.setCenter function)
4. Run the script
5. Check the quality of the image, if too cloudy modify the Cloud score range (csr) and rerun until a clear image is achieved
6. Use the slider on the "Mosaic" layer of the visualization to check the differences with the "Mosaic - NDWI" layer, in this way you can visually check the fit of the water threshold value (wth), modify wth and rerun until a good performance is achieved
7. Check the training areas using the "Mosaic - NDWI" layer (the one being classified), re run the script if changes are made
8. Visualize the "Mosaic - NDWI" and "Sand Classified" layers and use the slider to visually check the accuracy of the sand classification, you can modify the classification threshold (cth) to improve accuracy, but mind the implications of modifying the classification parameter when comparing several years
9. Visualize the "Mosaic - NDWI" and "NDVI>vth" layers and use the slider to check the accuracy of the vegetation classification
10. If satisfied with the results open the task tab and excecute the export of the data or retrieve it from the results list on the console

You can access the database of beach area for the coast of Montevideo (1984-2019) at: http://doi.org/10.5281/zenodo.4327667

To use Landsat 5 collection 
1) change the band variable on line #16 to: var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
2) change the collection variable by changing line #29 to: var collection = ee.ImageCollection('LANDSAT/LT5_L1T')

