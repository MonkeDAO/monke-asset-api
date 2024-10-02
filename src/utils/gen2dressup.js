const Jimp = require("jimp");
const { GifCodec, GifFrame, BitmapImage } = require("gifwrap");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { Readable } = require('stream');

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

    return new Promise((resolve, reject) => {
      backgroundImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
  } catch (err) {
    console.error("Error during monke wallpaper application:", err);
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

    return new Promise((resolve, reject) => {
      backgroundImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
  } catch (err) {
    console.error("Error during monke banner application:", err);
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

    return new Promise((resolve, reject) => {
      backgroundImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
  } catch (err) {
    console.error("Error during monke watch face application:", err);
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

    return new Promise((resolve, reject) => {
      backgroundImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
  } catch (err) {
    console.error("Error during monke background application:", err);
  }
}

async function appendSombreroToMonke(monkeyImageUrl, backgroundImagePath, outputPath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);

    monkeyImage.composite(backgroundImage, 0, 0);

    return new Promise((resolve, reject) => {
      monkeyImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
  } catch (err) {
    console.error("Error during sombrero application:", err);
  }
}

async function appendOutfitToMonke(monkeyImageUrl, backgroundImagePath, outputPath) {
  try {
    const monkeyImage = await Jimp.read(monkeyImageUrl);
    const backgroundImage = await Jimp.read(backgroundImagePath);

    monkeyImage.composite(backgroundImage, 0, 0);

    return new Promise((resolve, reject) => {
      monkeyImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
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

    return new Promise((resolve, reject) => {
      transparentImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
  } catch (err) {
    console.error("Error during monke background removal:", err);
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

    return outputGif.buffer;
  } catch (error) {
    console.error("Error during GIF composition:", error);
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
    // Load the background image
    const backgroundImage = await Jimp.read(backgroundImagePath).catch((err) => {
      throw new Error(`Failed to read background image: ${err.message}`);
    });
    const monkeyCount = monkeyImageUrls.length;

    // Calculate the width available for monkeys (leaving some padding on the right side)
    const availableWidth = backgroundImage.bitmap.width * 0.35; // Use 35% of the banner width
    const monkeyWidth = availableWidth / monkeyCount;

    // Start from the right side, leaving some padding
    let offsetX = backgroundImage.bitmap.width - 50;
    const maxHeight = backgroundImage.bitmap.height * 0.7; // Reduce max height to 70% of banner height

    for (const monkeyImageUrl of monkeyImageUrls.reverse()) {
      const monkeyImage = await Jimp.read(monkeyImageUrl);
      const commonColor = await getCommonColor(monkeyImage);
      
      if (!commonColor) {
        throw new Error("Failed to determine common color for transparency.");
      }

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

      // Calculate scale factor to fit monkey within allocated width and height
      const scaleWidth = monkeyWidth / transparentImage.bitmap.width;
      const scaleHeight = maxHeight / transparentImage.bitmap.height;
      const scaleFactor = Math.min(scaleWidth, scaleHeight, 0.9); // Cap at 90% of calculated scale

      transparentImage.scale(scaleFactor);

      // Position the monkey at the bottom right, flush with the bottom
      const monkeyY = backgroundImage.bitmap.height - transparentImage.bitmap.height;

      // Composite the monkey onto the background
      backgroundImage.composite(transparentImage, offsetX - transparentImage.bitmap.width, monkeyY);

      // Move to the next monkey position
      offsetX -= transparentImage.bitmap.width + 10; // 10px spacing between monkeys
    }

    // Write the final composite image to the output path
    return new Promise((resolve, reject) => {
      backgroundImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
        if (err) reject(err);
        else resolve(buffer);
      });
    });
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
