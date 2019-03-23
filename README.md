# Beer Depository

React Native app that uses [Imgur API](https://apidocs.imgur.com/) to browse images of currently owned beer cans and display them along with beer information.

App currently consists of three screens. First and main one is a paginated list of cans. Every can in the list has it's photo, Imgur title and full description shown here. For best performance, list is paginated to 10 cans per page. The second screen represents a more detailed view of the can, displaying a bigger picture and more structurally organized information from the can's description. This view opens once the user has selected a specific beer can from the catalogue. The thrid screen contains high resolution images of the beer cans. From this screen user can zoom in on the images or save them to device. Images are navigated through swiping gestures.

App is based on the original [Beer Depository](https://github.com/dradisavljevic/BeerDepository) android app.

## Motivation

App was created for the purpose of keeping track of my best friend's and mine beer can collection. As the number of cans in the collection increased it was difficult to keep track of which can is a new addition and which is a duplicate. Since one brand of beer can have multiple can designs, this app offers the possibility of comparing mentioned designs.

The decision to move to react native was in order to make it available on multiple platforms, not just android.

## Functionalities

Through usage of app, it is be possible to do following things:

1. Browse through the paginated list of beer cans
2. View images and information regarding every beer can in catalogue
3. Case insensitive search by beer can title
4. Search insensitive to diacritics and accents (example: đ and dj are same latter, same goes for ő and o), or accent folding.
5. Show spinner while requests are being processed
6. Get more details on each beer can, like size and country of origin, by opening a detailed view
7. Zooming in and seeing beer cans from all 4 angles.
8. Saving high resolution images of beer cans to device.
