const Jimp = require("jimp");
const axios = require("axios");

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
        transparentImage.bitmap.data[idx + 3] = 0; // Set the alpha channel to 0 (transparent)
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
};
