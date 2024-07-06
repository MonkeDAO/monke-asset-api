# Format of the data is as follows:

## For Gen 2

1. Image URI - https://localhost:3000/api/data/2/_number_/imageUri
2. Type - https://localhost:3000/api/data/2/_number_/type
3. Clothes - https://localhost:3000/api/data/2/_number_/clothes
4. Ears - https://localhost:3000/api/data/2/_number_/ears
5. Mouth - https://localhost:3000/api/data/2/_number_/mouth
6. Eyes - https://localhost:3000/api/data/2/_number_/eyes
7. Hat - https://localhost:3000/api/data/2/_number_/hat
8. Dressup - https://localhost:3000/api/dressup/2/_number_/_type_/_key_

type - check folders in the gen2assets folder
key - check files in the required type folder in gen2assets folder

## For Gen 3

1. Image URI - https://localhost:3000/api/data/3/_number_/imageUri
2. Species - https://localhost:3000/api/data/3/_number_/species
3. Hat - https://localhost:3000/api/data/3/_number_/hat
4. Eyewear - https://localhost:3000/api/data/3/_number_/eyewear
5. Clothes - https://localhost:3000/api/data/3/_number_/clothes
6. Mouth - https://localhost:3000/api/data/3/_number_/mouth
7. Background - https://localhost:3000/api/data/3/_number_/backgroundd // Note the two d's
8. Eyes - https://localhost:3000/api/data/3/_number_/eyes
9. Back - https://localhost:3000/api/data/3/_number_/back

# Contribution guidelines

- For adding specific assets for gen2, navigate to gen2assets and add the asset in the appopriate folder
- For modifying size of gen2 monke on the assets, navigate to src/utils/gen2dressup.js and change the value of transparentImage.scale(value) to the desired value, and for position, change the values of x and y in the compositeImage.composite(transparentImage, x, y).
- For adding gen3 dressup create a new file in src/utils called gen3dressup.js and add the functions you need, and create a new route in app.js for the new function.
- If you're creating gen3 dressup create a folder called gen3assets and add the assets there and then add the asset path in app.js
