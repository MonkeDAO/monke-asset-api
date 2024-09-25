const Jimp = require("jimp");
const { GifCodec, GifFrame, BitmapImage } = require("gifwrap");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

async function appendMonkeToWallpaper(monkeyImageUrl, backgroundImagePath, outputPath) {
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

    await backgroundImage.writeAsync(outputPath);
    console.log(`Image saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendMonkeToBanner(monkeyImageUrl, backgroundImagePath, outputPath) {
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

    await backgroundImage.writeAsync(outputPath);
    console.log(`Image saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendMonkeToWatchFace(monkeyImageUrl, backgroundImagePath, outputPath) {
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
    backgroundImage.composite(transparentImage, 25, 200);

    await backgroundImage.writeAsync(outputPath);
    console.log(`Image saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendMonkeToBackground(monkeyImageUrl, backgroundImagePath, outputPath) {
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

    await backgroundImage.writeAsync(outputPath);
    console.log(`Image saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendSombreroToMonke(monkeyImageUrl, backgroundImagePath, outputPath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);

    monkeyImage.composite(backgroundImage, 0, 0);

    await monkeyImage.writeAsync(outputPath);
    console.log(`Image saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function appendOutfitToMonke(monkeyImageUrl, backgroundImagePath, outputPath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);

    monkeyImage.composite(backgroundImage, 0, 0);

    await monkeyImage.writeAsync(outputPath);
    console.log(`Image saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function removeMonkeBackground(monkeyImageUrl, outputPath) {
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

    await transparentImage.writeAsync(outputPath);
    console.log(`Image saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error:", err);
  }
}

async function compositeGIFOverImage(imageUrl, gifPath, outputPath) {
  try {
    const response = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(response.data);
    const baseImage = await Jimp.read(imageBuffer);

    const gifData = fs.readFileSync(gifPath);
    const gifCodec = new GifCodec();
    const gif = await gifCodec.decodeGif(gifData);

    const outputFrames = [];

    for (const frame of gif.frames) {
      const gifFrame = new Jimp(frame.bitmap.width, frame.bitmap.height);
      gifFrame.bitmap = frame.bitmap;

      const compositeImage = baseImage.clone();

      compositeImage.composite(gifFrame, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacitySource: 1,
        opacityDest: 1,
      });

      const newFrame = new GifFrame(new BitmapImage(compositeImage.bitmap));
      newFrame.delayCentisecs = frame.delayCentisecs;

      outputFrames.push(newFrame);
    }

    const outputGif = await gifCodec.encodeGif(outputFrames);

    fs.writeFileSync(outputPath, outputGif.buffer);

    console.log(`Animated GIF saved successfully to ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function multiMonkeBanner(monkeyImageUrls, backgroundImagePath, outputPath) {
  try {
    // Validate input parameters
    if (!Array.isArray(monkeyImageUrls) || monkeyImageUrls.length === 0) {
      throw new Error("Invalid monkey image URLs provided.");
    }
    if (typeof backgroundImagePath !== "string" || !backgroundImagePath) {
      throw new Error("Invalid background image path.");
    }
    if (typeof outputPath !== "string" || !outputPath) {
      throw new Error("Invalid output path.");
    }

    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    // Load the background image
    const backgroundImage = await Jimp.read(backgroundImagePath).catch((err) => {
      throw new Error(`Failed to read background image: ${err.message}`);
    });

    let offsetX = backgroundImage.bitmap.width - 200;
    const offsetY = backgroundImage.bitmap.height - 330;

    for (const monkeyImageUrl of monkeyImageUrls) {
      // Load each monkey image
      const monkeyImage = await Jimp.read(monkeyImageUrl).catch((err) => {
        throw new Error(`Failed to read monkey image from URL ${monkeyImageUrl}: ${err.message}`);
      });

      // Ensure getCommonColor is defined and correctly implemented
      const commonColor = await getCommonColor(monkeyImage);
      if (!commonColor) {
        throw new Error("Failed to determine common color for transparency.");
      }

      const transparentImage = new Jimp(
        monkeyImage.bitmap.width,
        monkeyImage.bitmap.height,
        0x00000000
      );

      // Process pixels for transparency
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

      // Scale the image safely
      transparentImage.scale(1.75);

      // Composite the transparent image onto the background
      backgroundImage.composite(transparentImage, offsetX, offsetY);

      // Update offset for next image
      offsetX -= transparentImage.bitmap.width * 0.75;
    }

    // Write the final composite image to the output path
    await backgroundImage.writeAsync(outputPath).catch((err) => {
      throw new Error(`Failed to write output image: ${err.message}`);
    });

    console.log(`Multi-monke banner saved as ${outputPath}`);
    return outputPath;
  } catch (err) {
    console.error("Error during multi-monke banner creation:", err);
    throw err; // Rethrow error to be handled by calling function
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
  multiMonkeBanner,
};
