const Jimp = require("jimp");
const { GifCodec, GifFrame, BitmapImage } = require("gifwrap");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function appendMonkeToWallpaper(monkeyImageUrl, backgroundImagePath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);
    const commonColor = await getCommonColor(monkeyImage);
    const transparentImage = new Jimp(
      monkeyImage.bitmap.width,
      monkeyImage.bitmap.height,
      0x00000000
    );
    monkeyImage.scan(0, 0, monkeyImage.bitmap.width, monkeyImage.bitmap.height, (x, y, idx) => {
      const pixel = Jimp.intToRGBA(monkeyImage.getPixelColor(x, y));
      if (pixel.r === commonColor.r && pixel.g === commonColor.g && pixel.b === commonColor.b) {
        transparentImage.bitmap.data[idx + 3] = 0; // Set the alpha channel to 0 (transparent)
      } else {
        transparentImage.bitmap.data[idx] = pixel.r;
        transparentImage.bitmap.data[idx + 1] = pixel.g;
        transparentImage.bitmap.data[idx + 2] = pixel.b;
        transparentImage.bitmap.data[idx + 3] = pixel.a;
      }
    });

    transparentImage.scale(3);
    backgroundImage.composite(transparentImage, 450, 2700);

    await backgroundImage.writeAsync("reqmonkewallpaper.png");
    console.log("Image saved as reqmonkewallpaper.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendMonkeToBanner(monkeyImageUrl, backgroundImagePath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);
    const commonColor = await getCommonColor(monkeyImage);
    const transparentImage = new Jimp(
      monkeyImage.bitmap.width,
      monkeyImage.bitmap.height,
      0x00000000
    );
    monkeyImage.scan(0, 0, monkeyImage.bitmap.width, monkeyImage.bitmap.height, (x, y, idx) => {
      const pixel = Jimp.intToRGBA(monkeyImage.getPixelColor(x, y));
      if (pixel.r === commonColor.r && pixel.g === commonColor.g && pixel.b === commonColor.b) {
        transparentImage.bitmap.data[idx + 3] = 0;
      } else {
        transparentImage.bitmap.data[idx] = pixel.r;
        transparentImage.bitmap.data[idx + 1] = pixel.g;
        transparentImage.bitmap.data[idx + 2] = pixel.b;
        transparentImage.bitmap.data[idx + 3] = pixel.a;
      }
    });

    transparentImage.scale(1.75);
    backgroundImage.composite(transparentImage, 1500, 330);

    await backgroundImage.writeAsync("reqmonkebanner.png");
    console.log("Image saved as reqmonkebanner.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendMonkeToWatchFace(monkeyImageUrl, backgroundImagePath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);
    const commonColor = await getCommonColor(monkeyImage);
    const transparentImage = new Jimp(
      monkeyImage.bitmap.width,
      monkeyImage.bitmap.height,
      0x00000000
    );
    monkeyImage.scan(0, 0, monkeyImage.bitmap.width, monkeyImage.bitmap.height, (x, y, idx) => {
      const pixel = Jimp.intToRGBA(monkeyImage.getPixelColor(x, y));
      if (pixel.r === commonColor.r && pixel.g === commonColor.g && pixel.b === commonColor.b) {
        transparentImage.bitmap.data[idx + 3] = 0;
      } else {
        transparentImage.bitmap.data[idx] = pixel.r;
        transparentImage.bitmap.data[idx + 1] = pixel.g;
        transparentImage.bitmap.data[idx + 2] = pixel.b;
        transparentImage.bitmap.data[idx + 3] = pixel.a;
      }
    });

    transparentImage.scale(2);
    backgroundImage.composite(transparentImage, 25, 25);

    await backgroundImage.writeAsync("reqmonkewatchface.png");
    console.log("Image saved as reqmonkewatchface.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendMonkeToBackground(monkeyImageUrl, backgroundImagePath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);
    const commonColor = await getCommonColor(monkeyImage);
    const transparentImage = new Jimp(
      monkeyImage.bitmap.width,
      monkeyImage.bitmap.height,
      0x00000000
    );
    monkeyImage.scan(0, 0, monkeyImage.bitmap.width, monkeyImage.bitmap.height, (x, y, idx) => {
      const pixel = Jimp.intToRGBA(monkeyImage.getPixelColor(x, y));
      if (pixel.r === commonColor.r && pixel.g === commonColor.g && pixel.b === commonColor.b) {
        transparentImage.bitmap.data[idx + 3] = 0;
      } else {
        transparentImage.bitmap.data[idx] = pixel.r;
        transparentImage.bitmap.data[idx + 1] = pixel.g;
        transparentImage.bitmap.data[idx + 2] = pixel.b;
        transparentImage.bitmap.data[idx + 3] = pixel.a;
      }
    });

    transparentImage.scale(1);
    backgroundImage.composite(transparentImage, 0, 0);

    await backgroundImage.writeAsync("reqmonkebg.png");
    console.log("Image saved as reqmonkebg.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendSombreroToMonke(monkeyImageUrl, backgroundImagePath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);

    monkeyImage.composite(backgroundImage, 0, 0);

    await monkeyImage.writeAsync("reqmonkesombrero.png");
    console.log("Image saved as reqmonkesombrero.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendOutfitToMonke(monkeyImageUrl, backgroundImagePath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);

    monkeyImage.composite(backgroundImage, 0, 0);

    await monkeyImage.writeAsync("reqmonkeoutfit.png");
    console.log("Image saved as reqmonkeoutfit.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function removeMonkeBackground(monkeyImageUrl) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const commonColor = await getCommonColor(monkeyImage);
    const transparentImage = new Jimp(
      monkeyImage.bitmap.width,
      monkeyImage.bitmap.height,
      0x00000000
    );
    monkeyImage.scan(0, 0, monkeyImage.bitmap.width, monkeyImage.bitmap.height, (x, y, idx) => {
      const pixel = Jimp.intToRGBA(monkeyImage.getPixelColor(x, y));
      if (pixel.r === commonColor.r && pixel.g === commonColor.g && pixel.b === commonColor.b) {
        transparentImage.bitmap.data[idx + 3] = 0;
      } else {
        transparentImage.bitmap.data[idx] = pixel.r;
        transparentImage.bitmap.data[idx + 1] = pixel.g;
        transparentImage.bitmap.data[idx + 2] = pixel.b;
        transparentImage.bitmap.data[idx + 3] = pixel.a;
      }
    });

    transparentImage.scale(1);

    await transparentImage.writeAsync("reqmonkenobg.png");
    console.log("Image saved as reqmonkenobg.png");
  } catch (err) {
    console.error("Error:", err);
  }
}

async function compositeGIFOverImage(imageUrl, gifPath, outputPath) {
  try {
    // Step 1: Download the image using axios
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(response.data);
    const baseImage = await Jimp.read(imageBuffer);

    // Step 2: Load the GIF
    const gifData = fs.readFileSync(gifPath);
    const gifCodec = new GifCodec();
    const gif = await gifCodec.decodeGif(gifData);

    // Step 3: Prepare a sequence of frames for the new GIF
    const outputFrames = [];

    for (const frame of gif.frames) {
      // Convert each frame to a Jimp image
      const gifFrame = new Jimp(frame.bitmap.width, frame.bitmap.height);
      gifFrame.bitmap = frame.bitmap;

      // Create a new Jimp image to composite GIF frame over the base image
      const compositeImage = baseImage.clone();

      // Composite GIF frame over the base image at a specified position (e.g., top-left corner)
      compositeImage.composite(gifFrame, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 1,
        opacityDest: 1,
      });

      // Convert the composited image to a GIF frame
      const newFrame = new GifFrame(new BitmapImage(compositeImage.bitmap));
      newFrame.delayCentisecs = frame.delayCentisecs; // Preserve the frame delay

      // Add the frame to the output sequence
      outputFrames.push(newFrame);
    }

    // Step 4: Encode the sequence of frames into a new GIF
    const outputGif = await gifCodec.encodeGif(outputFrames);

    // Step 5: Save the output GIF
    fs.writeFileSync(outputPath, outputGif.buffer);

    console.log(`Animated GIF saved successfully to ${outputPath}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getCommonColor(image) {
  const colorMap = {};
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
    const key = `${pixel.r},${pixel.g},${pixel.b}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  });

  let mostCommonColor = { count: 0 };
  for (const color in colorMap) {
    if (colorMap[color] > mostCommonColor.count) {
      const [r, g, b] = color.split(",");
      mostCommonColor = { count: colorMap[color], r: parseInt(r), g: parseInt(g), b: parseInt(b) };
    }
  }

  return mostCommonColor;
}

module.exports = {
  appendMonkeToWallpaper,
  appendMonkeToBanner,
  appendMonkeToWatchFace,
  appendMonkeToBackground,
  removeMonkeBackground,
  appendSombreroToMonke,
  appendOutfitToMonke,
  compositeGIFOverImage,
};
