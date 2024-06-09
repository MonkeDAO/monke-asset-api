const Jimp = require("jimp");
const GIFEncoder = require("gif-encoder");
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

async function appendGifToMonke(monkeyImageUrl, gifFilePath) {
  try {
    // Load the monkey image
    const monkeyImage = await Jimp.read(monkeyImageUrl);

    // Load the GIF
    const gifData = fs.readFileSync(gifFilePath);
    const gifEncoder = new GIFEncoder(monkeyImage.bitmap.width, monkeyImage.bitmap.height);

    // Process each frame of the GIF
    let frameIndex = 0;
    while (frameIndex < gifData.length) {
      const frameData = gifData.slice(frameIndex, frameIndex + 4);
      const frameImage = await Jimp.read(Buffer.from(frameData));

      // Composite the GIF frame onto the monkey image
      const x = 0; // X-coordinate to place the GIF frame
      const y = 0; // Y-coordinate to place the GIF frame
      monkeyImage.composite(frameImage, x, y);

      // Add the composited frame to the GIF encoder
      gifEncoder.setDelay(10); // Set the delay between frames (in milliseconds)
      gifEncoder.start();
      gifEncoder.addFrame(monkeyImage.bitmap.data);
      gifEncoder.finish();
    }

    // Write the output GIF file
    const outputBuffer = gifEncoder.stream().toBitStream();
    fs.writeFileSync("result.gif", buffer);
    console.log(`GIF saved as result.gif`);
  } catch (err) {
    console.error("Error:", err);
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
  appendGifToMonke,
};
