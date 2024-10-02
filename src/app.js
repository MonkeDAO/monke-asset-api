const express = require("express");
const fs = require("fs");
const path = require("path");
const {
  findImageUrisByName,
  findGen3ImageUrisByName,
  findTraitByName,
  findGen3TraitByName,
  findAllTraits,
} = require("./utils/fetch");
const {
  appendMonkeToWallpaper,
  appendMonkeToBanner,
  appendMonkeToWatchFace,
  appendMonkeToBackground,
  removeMonkeBackground,
  appendSombreroToMonke,
  appendOutfitToMonke,
  compositeGIFOverImage,
  multiMonkeBanner
} = require("./utils/gen2dressup");

const monkeDataPath = path.join(__dirname, ".", "data", "monkeList.json");
const gen3DataPath = path.join(__dirname, ".", "data", "gen3List.json");

const formatKey = (type, key) => {
  if (key.endsWith('.png') || (type === 'gifs' && key.endsWith('.gif'))) {
    return key;
  }
  
  const extension = type === 'gifs' ? '.gif' : '.png';
  return `${key}${extension}`;
}

let jsonData, gen3JsonData;
try {
  jsonData = JSON.parse(fs.readFileSync(monkeDataPath, "utf-8"));
  console.log(" Gen 2 JSON data loaded successfully");
  gen3JsonData = JSON.parse(fs.readFileSync(gen3DataPath, "utf-8"));
  console.log(" Gen 3 JSON data loaded successfully");
} catch (error) {
  console.error("Error reading monke data:", error, {monkeDataPath});
  process.exit(1);
}

const app = express();

app.get("/api/data/2/:number/traits", (req, res) => {
  const number = req.params.number;
  const traits = findAllTraits(jsonData, `SMB #${number}`);
  return res.status(200).json({ traits });
});

app.get("/api/data/:generation/:number/:key", (req, res) => {
  const generation = req.params.generation;
  const number = req.params.number;
  const key = req.params.key;

  console.log(generation);

  let inputName, imageUri, type, clothes, ears, mouth, eyes, species, eyewear, backgroundd;

  if (generation === "2") {
    inputName = `SMB #${number}`;
    console.log(inputName);
    imageUri = findImageUrisByName(jsonData, inputName).toString();
    type = findTraitByName(jsonData, inputName, "Type");
    clothes = findTraitByName(jsonData, inputName, "Clothes");
    ears = findTraitByName(jsonData, inputName, "Ears");
    mouth = findTraitByName(jsonData, inputName, "Mouth");
    eyes = findTraitByName(jsonData, inputName, "Eyes");
    hat = findTraitByName(jsonData, inputName, "Hat");
  }

  if (generation === "3") {
    inputName = `SMB Gen3 #${number}`;
    console.log(inputName);
    imageUri = findGen3ImageUrisByName(gen3JsonData, inputName).toString();
    species = findGen3TraitByName(gen3JsonData, inputName, "Species");
    hat = findGen3TraitByName(gen3JsonData, inputName, "Hat");
    eyewear = findGen3TraitByName(gen3JsonData, inputName, "Eyewear");
    clothes = findGen3TraitByName(gen3JsonData, inputName, "Clothes");
    mouth = findGen3TraitByName(gen3JsonData, inputName, "Mouth");
    backgroundd = findGen3TraitByName(gen3JsonData, inputName, "Background");
    eyes = findGen3TraitByName(gen3JsonData, inputName, "Eyes");
    back = findGen3TraitByName(gen3JsonData, inputName, "Back");
  }

  console.log(key);
  console.log(imageUri);

  if (key === "imageUri") {
    return res.status(200).json({ [key]: imageUri });
  } else if (key === "type") {
    return res.status(200).json({ [key]: type });
  } else if (key === "clothes") {
    return res.status(200).json({ [key]: clothes });
  } else if (key === "ears") {
    return res.status(200).json({ [key]: ears });
  } else if (key === "mouth") {
    return res.status(200).json({ [key]: mouth });
  } else if (key === "eyes") {
    return res.status(200).json({ [key]: eyes });
  } else if (key === "species") {
    return res.status(200).json({ [key]: species });
  } else if (key === "eyewear") {
    return res.status(200).json({ [key]: eyewear });
  } else if (key === "backgroundd") {
    return res.status(200).json({ [key]: backgroundd });
  } else if (key === "hat") {
    return res.status(200).json({ [key]: hat });
  } else if (key === "eyes") {
    return res.status(200).json({ [key]: eyes });
  } else if (key === "back") {
    return res.status(200).json({ [key]: back });
  } else {
    return res.status(404).json({ error: "Key not found" });
  }
});

app.get("/api/dressup/3/:number/gifs/:key", async (req, res) => {
  const number = req.params.number;
  const key = req.params.key;
  const inputName = `SMB Gen3 #${number}`;
  const imageUri = findGen3ImageUrisByName(gen3JsonData, inputName).toString();
  console.log(imageUri);
  const assetPath = path.join(__dirname, "..", "gen2assets", "gifs", formatKey("gifs", key));

  try {
    const gifBuffer = await compositeGIFOverImage(imageUri, assetPath, outputPath);
    if (!gifBuffer) {
      return res.status(500).json({ error: "GIF could not be generated" });
    }
    res.set('Content-Type', 'image/gif');
    return res.status(200).send(gifBuffer);
  } catch (error) {
    console.error('Error in catch block:', error, {number, key});
    res.status(500).json({ error: "An error occurred during the process" });
  }
});

app.get("/api/dressup/2/:number/:type/:key", async (req, res) => {
  const number = req.params.number;
  const type = req.params.type;
  const key = req.params.key;
  const inputName = `SMB #${number}`;
  const imageUri = findImageUrisByName(jsonData, inputName).toString();
  const assetPath = path.join(__dirname, "..", "gen2assets", type, formatKey(type, key));

  try {
    let resultBuffer;
    let contentType = 'image/png';

    if (type === "banners") {
      resultBuffer = await appendMonkeToBanner(imageUri, assetPath);
    } else if (type === "wallpapers") {
      resultBuffer = await appendMonkeToWallpaper(imageUri, assetPath);
    } else if (type === "watchfaces") {
      resultBuffer = await appendMonkeToWatchFace(imageUri, assetPath);
    } else if (type === "pfp_backgrounds") {
      resultBuffer = await appendMonkeToBackground(imageUri, assetPath);
    } else if (type === "sombreros") {
      resultBuffer = await appendSombreroToMonke(imageUri, assetPath);
    } else if (type === "outfits") {
      resultBuffer = await appendOutfitToMonke(imageUri, assetPath);
    } else if (type === "gifs") {
      resultBuffer = await compositeGIFOverImage(imageUri, assetPath);
      contentType = 'image/gif';
    } else {
      return res.status(404).json({ error: "Type not found" });
    }

    if (!resultBuffer) {
      return res.status(500).json({ error: "Image could not be generated" });
    }

    res.set('Content-Type', contentType);
    return res.status(200).send(resultBuffer);
  } catch (error) {
    console.error('Error in catch block dressup/2/:number/:type/:key:', error, {type, key, number});
    res.status(500).json({ error: "An error occurred during the process" });
  }
});

app.get("/api/dressup/2/multibanners/:type/:n1/:n2?/:n3?/:n4?", async (req, res) => {
  const type = req.params.type;
  const n1 = req.params.n1;
  const n2 = req.params.n2;
  const n3 = req.params.n3;
  const n4 = req.params.n4;

  const imageUri1 = findImageUrisByName(jsonData, `SMB #${n1}`).toString();
  const imageUri2 = findImageUrisByName(jsonData, `SMB #${n2}`).toString();
  const imageUri3 = findImageUrisByName(jsonData, `SMB #${n3}`).toString();
  const imageUri4 = findImageUrisByName(jsonData, `SMB #${n4}`).toString();

  let imageUrls = [imageUri1, imageUri2, imageUri3, imageUri4];

  imageUrls = imageUrls.filter((element) => element !== "");

  console.log(imageUrls);

  if (!imageUrls || !Array.isArray(imageUrls)) {
    return res.status(400).json({ error: "Please provide an array of image URLs" });
  }

  const backgroundImagePath = path.join(__dirname, "..", "gen2assets", "multibanners", type);
  console.log(backgroundImagePath);
  const outputPath = path.join(__dirname, "..", "multiresults", `result.png`);
  console.log(outputPath);

  try {
    const resultBuffer = await multiMonkeBanner(imageUrls, backgroundImagePath, outputPath);

    res.set('Content-Type', 'image/png');
    return res.status(200).send(resultBuffer);
  } catch (error) {
    console.error('Error in catch block multiMonkeBanner:', error, {type, n1, n2, n3, n4});
    res.status(500).json({ error: "An error occurred during the process" });
  }
});

app.get("/api/dressup/2/:number/nobg", async (req, res) => {
  const generation = 2;
  const number = req.params.number;
  const inputName = `SMB #${number}`;
  const imageUri = findImageUrisByName(jsonData, inputName).toString();
  const outputPath = path.join(__dirname, "..", "results", `result.png`);

  try {
    const resultBuffer = await removeMonkeBackground(imageUri, outputPath);

    res.set('Content-Type', 'image/png');
    return res.status(200).send(resultBuffer);
  } catch (error) {
    console.error('Error in catch block removeMonkeBackground:', error, {number});
    res.status(500).json({ error: "An error occurred during the process" });
  }
});

app.get("/api/assets/:type", async (req, res) => {
  const type = req.params.type;
  const assetPath = path.join(__dirname, "..", "gen2assets", type);

  try {
    if (!fs.existsSync(assetPath)) {
      return res.status(404).json({ error: `Asset type "${type}" does not exist` });
    }
    const files = fs.readdirSync(assetPath);
    const assetNames = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.gif', '.jpg', '.jpeg'].includes(ext);
      })
      .map(file => path.basename(file, path.extname(file)));

    const formattedAssetNames = assetNames.map(name => 
      name.split(/[-_]/)
        .map(word => word.charAt(0) + word.slice(1))
        .join(' ')
    );

    res.status(200).json({
      type: type,
      assets: formattedAssetNames
    });
  } catch (error) {
    console.error(`Error reading assets for type ${type}:`, error);
    res.status(500).json({ error: "An error occurred while fetching assets" });
  }
});

app.listen(3005, () => {
  console.log("API server is running on port 3005");
});
