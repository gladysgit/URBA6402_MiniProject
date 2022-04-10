# #hkhiking - Exploring Hiking in Hong Kong from Instagram
Demonstration: https://gladysgit.github.io/hkhiking/

Presentation: https://youtu.be/16cZ7-lRaxU

## Data Acqusition - Web Scraping from Instagram
1. The project data is the posts with #hkhiking collected from Instagram in March 2022. As Facebook official Graph API does not provide the location inforamtion, the thrid party API [instagrapi]( https://github.com/adw0rd/instagrapi) was used for web scraping.
2. The raw data was about 7 thousands of posts, mainly including users, captions, locations. The data was stored in sqlite database for further processing.
3. Python (with pandas) was adopted for data preparation. The hastags and emojis were extracted from captions.
4. With the help of Geopandas, the additional attributes 'cp' (whether the location is within country park) and 'dist2trail' (distance to hiking trail) were computed. Of course, the shapefile of country parks and hiking trails are required for this step.
5. For social network analysis, the data of nodes (i.e. posts, users, hashtags and locations) and edges (i.e. the relationship of posts and other nodees) were prepared in this stage. The social reactions (total number of posts, likes and comments) were included as weights.

## Data Analytics - Social Network Analysis
1. Descriptive analysis on the project data was first carried out in terms of time, users, hashtags and emojis, etc.
2. The nodes and edges data were imported to neo4j for data analysis and visualization. Then, some hidden relationships such as hashtag-hashtag, location-hashtag were also established using neo4j.
3. Vote rank was applied to the hashtag network (i.e. only the hashtags were taken into consideration) to identify the top influential hashtags.
4. Community detection can also be applied for user network for data cleansing (say filtering the business accounts).

## Data Analytics - Spatial Analysis
1. Making use of these two additional attributes 'cp' and 'dist2trail', the irrelevant locations (not within country parks nor along hiking trails) can be filtered.
2. It is noticed that some location points are describing the same location, e.g. the points "獅子山山頂" and "Lion Rock". They were aggregated into one group by spatial operation.
3. The aggregated location groups were ranked based on social reactions. To indicate the popularity, the total number of likes were taken into consideration.

## Data Visualization - Virtual Tour on 3D Map
1. The locations, country parks and hiking trails were converted into GeoJSON format for uploading to MapBox.
2. The cartographic presentation of the above features and the map base were configured in Mapbox as well.
3. To present the analysis result in a better way, a virtual tour was prepared using the tileset service of Mapbox and Mapbox GL JS.
4. With help of turfs.js, the top hiking trail was split into equal portions and presented progressively with the scrolling action.

## Way forward
1. Collect more data from Instagram
2. Identify time pattern of hiking
3. Detect the similiarities in photos and videos
4. Detailly study the reasons of popular hiking trails, say making use of the hashtags

Prepared by Gladys Lai (#3035777119)
for HKU MUA URBA6402 Mini Project
