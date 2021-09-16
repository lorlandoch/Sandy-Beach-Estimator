//CloudScoreRange	(csr) The size of the range of cloud scores to accept per pixel
var csr = 40;
// water threshold (wth) mask the non-watery parts of the image, where NDWI < wth
var wth = 0.25;
// classificaton threshold (cth) for the mayority vote of the Random Forest sand detection
var cth = 0.50;
// ndvi beach vegetation threshold (vth)
var vth = 0.25;

//year, month, day
var year = 2015;
var montho = 1; var dayo= 1; 
var monthf=12; var dayf=31;

//work bands
var bands = ['B1','B2','B3','B4','B5','B6_VCID_1','B6_VCID_2', 'B7','B8'];

//Construct dates delimiting the study period
var start = ee.Date.fromYMD(year,montho,dayo);
var finish = ee.Date.fromYMD(year,monthf,dayf);

//Geographic zone
var point = ee.Geometry.Point(-56.23, -34.87);

//Center map for visualization
Map.setCenter(-56.23, -34.87, 12);

// Load Landsat 7 data, filter by date and zone
var collection = ee.ImageCollection('LANDSAT/LE07/C01/T1')
  .filterBounds(point)
  .filterDate(start, finish)
  .select(bands);

// Get the number of images for the selected period and region.
var count = collection.size();
print('N(pics): ', count);

//Create a composite from all images in the period
var composite = ee.Algorithms.Landsat.simpleComposite(collection, 50, csr);

// Training areas
  //0 sand 
  //1 other = urban + miscellaneous
var pts = ee.FeatureCollection.randomPoints(sand, 100);
var addclass = function(feature) {
  return feature.set({'class': 0});
};
var sandy = pts.map(addclass);

var pts = ee.FeatureCollection.randomPoints(other, 100);
var addclass = function(feature) {
  return feature.set({'class': 1});
};
var other = pts.map(addclass);
var sample = sandy.merge(other);
var sample = ee.FeatureCollection(sample);

//Create a region of interest (roi) by drawing a 20000 meter buffer around a point.
var roi = point.buffer(20000);

// Display a clipped version of the mosaic.
Map.addLayer(composite.clip(roi), {bands: ['B3','B2','B1'], min:0, max:50}, 'Mosaic');

// Create an NDWI image, define visualization parameters and display.
var ndwi = composite.clip(roi).normalizedDifference(['B3', 'B5']);

// Mask the non-watery parts of the image, where NDWI < 0.35
var ndwiMasked = ndwi.updateMask(ndwi.gte(wth));
var water = ndwiMasked.mask();

//Find areas that do not intersect water
var mosaic2 = composite.mask(water.not());
Map.addLayer(mosaic2.clip(roi),  {bands: ['B3','B2','B1'], min:0, max:50},'Mosaic - NDWI');

// Get the values for all pixels in each polygon in the training.
var training = mosaic2.clip(roi).sampleRegions({
  // Get the sample from the polygons FeatureCollection.
  collection: sample,
  // Keep this list of properties from the polygons.
  properties: ['class'],
  // Set the scale to get Landsat pixels in the polygons.
  scale: 30
});

// Classification
var classifier = ee.Classifier.smileRandomForest({
  numberOfTrees: 1000,
}).setOutputMode('PROBABILITY');

// Train the classifier. (data, y, X)
var trained = classifier.train(training, 'class', bands);

// Classify the image.
var classified = mosaic2.classify(trained);

// Create a palette to display the classes.
var palette =['EEE8AA','E8195A'];

//Display the image.
Map.addLayer(classified.clip(roi), {min: 0, max: 1, palette: palette}, 'Sand Probability', false);

//Create function for Sand area measurement
var sandarea = classified.lte(cth);

function area(beachpoly){
var sandarea = classified.lte(cth);
var SqM = ee.Image.pixelArea().clip(beachpoly);
var Area = sandarea.multiply(SqM);
var Areatot = Area.reduceRegion(ee.Reducer.sum(), beachpoly, 30);
return Areatot;
}

Map.addLayer(sandarea.clip(roi), {min: 0, max: 1, palette:['E8195A', 'EEE8AA']}, 'Sand Classified', false);

//NDVI
var ndvi =  mosaic2.normalizedDifference(['B4', 'B3']);
var ndviM = ndvi.updateMask(ndvi.gte(0.15));
var ndviParams = {min: 0, max: 1, palette: ['green']};

var dif = sandarea.subtract(ndviM);
var difndvi = dif.lte(vth);
Map.addLayer(difndvi.clip(roi),{min: 0, max: 1, palette: ['green']} , 'NDVI>vth', false);

//create function for measuring beach vegetation measurement
function vegetation(beachpoly){
var difndvi = dif.lte(vth);
var SqM = ee.Image.pixelArea().clip(beachpoly);
var Area = difndvi.multiply(SqM);
var Areatot = Area.reduceRegion(ee.Reducer.sum(), beachpoly, 30);
return Areatot;
}

//create, print and save object with results
var fe= [ 
ee.Feature(beach1).set('name', 'beach1').set('sand', area(beach1)).set('veget', vegetation(beach1)).set('year', year),
];
print('results', fe);

var out = ee.FeatureCollection (fe);
Export.table.toDrive({
  collection: out,
  description: 'L7BeachArea',
//folder: '',
  fileNamePrefix:	'L7BeachArea' + year,	
  fileFormat: 'CSV'
});
