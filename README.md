# Beer Depository

React Native app that uses [Imgur API](https://apidocs.imgur.com/) to browse images of currently owned beer cans and display them along with beer information. 

App should consists of two screens. First and main one is a paginated list of cans. Every can in the list has it's photo, Imgur title and full description shown here. For best performance, it should be limited to 10 cans per page. The second screen should represent a more detailed view of the can, displaying a bigger picture and more structurally organized information from the can's description. This view opens once the user has selected a specific beer can from the catalogue.

App is based on the original [Beer Depository](https://github.com/dradisavljevic/BeerDepository) android app.

## Motivation

App was created for the purpose of keeping track of my best friend's and mine beer can collection. As the number of cans in the collection increased it was difficult to keep track of which can is a new addition and which is a duplicate. Since one brand of beer can have multiple can designs, this app offers the possibility of comparing mentioned designs.

The decision to move to react native was in order to make it available on multiple platforms, not just android.

## Functionalities

Through usage of app, it should be possible to do following things:

1. Browse through the paginated list of beer cans
2. View images and information regarding every beer can in catalogue
3. Case insensitive search by beer can title if input isn't capitalized
4. Case sensitive search by beer can title if the input is capitalized
5. Search insensitive to diacritics and accents (example: đ and dj are same latter, same goes for ő and o)
6. Show progress bar before while requests are being processed
7. Get more details on each beer can, like size and country of origin, by opening a detailed view
