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
} = require("./utils/gen2dressup");

const monkeDataPath = path.join(__dirname, ".", "data", "monkeList.json");
const gen3DataPath = path.join(__dirname, ".", "data", "gen3List.json");
let jsonData, gen3JsonData;
try {
  jsonData = JSON.parse(fs.readFileSync(monkeDataPath, "utf-8"));
  console.log(" Gen 2 JSON data loaded successfully");
  gen3JsonData = JSON.parse(fs.readFileSync(gen3DataPath, "utf-8"));
  console.log(" Gen 3 JSON data loaded successfully");
} catch (error) {
  console.error("Error reading monke data:", error);
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
  const assetPath = path.join(__dirname, "..", "gen2assets", "gifs", key);
  let outputPath, resultPath;

  outputPath = path.join(__dirname, "..", "gen3results", "result.gif");

  console.log(outputPath);

  try {
    resultPath = await compositeGIFOverImage(imageUri, assetPath, outputPath);

    console.log(resultPath);

    if (!resultPath || !fs.existsSync(resultPath)) {
      return res.status(500).json({ error: "File could not be generated" });
    }

    return res.status(200).sendFile(resultPath, (err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Failed to send the file",
          error: err.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during the process" });
  }
});

app.get("/api/dressup/2/:number/:type/:key", async (req, res) => {
  const number = req.params.number;
  const type = req.params.type;
  const key = req.params.key;
  const inputName = `SMB #${number}`;
  const imageUri = findImageUrisByName(jsonData, inputName).toString();
  const assetPath = path.join(__dirname, "..", "gen2assets", type, key);
  let outputPath, resultPath;

  if (type === "gifs") {
    outputPath = path.join(__dirname, "..", "results", "result.gif");
  } else {
    outputPath = path.join(__dirname, "..", "results", `result.png`);
  }

  try {
    if (type === "banners") {
      resultPath = await appendMonkeToBanner(imageUri, assetPath, outputPath);
    } else if (type === "wallpapers") {
      resultPath = await appendMonkeToWallpaper(imageUri, assetPath, outputPath);
    } else if (type === "watchfaces") {
      resultPath = await appendMonkeToWatchFace(imageUri, assetPath, outputPath);
    } else if (type === "pfp_backgrounds") {
      resultPath = await appendMonkeToBackground(imageUri, assetPath, outputPath);
    } else if (type === "sombreros") {
      resultPath = await appendSombreroToMonke(imageUri, assetPath, outputPath);
    } else if (type === "outfits") {
      resultPath = await appendOutfitToMonke(imageUri, assetPath, outputPath);
    } else if (type === "gifs") {
      resultPath = await compositeGIFOverImage(imageUri, assetPath, outputPath);
    } else {
      return res.status(404).json({ error: "Type not found" });
    }

    // Check if resultPath is valid
    if (!resultPath || !fs.existsSync(resultPath)) {
      return res.status(500).json({ error: "File could not be generated" });
    }

    return res.status(200).sendFile(resultPath, (err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Failed to send the file",
          error: err.message,
        });
      }
    });
  } catch (error) {
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
    const resultPath = await MultiMonkeBanner(imageUrls, backgroundImagePath, outputPath);

    if (!resultPath || !fs.existsSync(resultPath)) {
      return res.status(500).json({ error: "File could not be generated" });
    }

    return res.status(200).sendFile(resultPath, (err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Failed to send the file",
          error: err.message,
        });
      }
    });
  } catch (error) {
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
    const resultPath = await removeMonkeBackground(imageUri, outputPath);

    // Check if resultPath is valid
    if (!resultPath || !fs.existsSync(resultPath)) {
      return res.status(500).json({ error: "File could not be generated" });
    }

    return res.status(200).sendFile(resultPath, (err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Failed to send the file",
          error: err.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during the process" });
  }
});

app.listen(3005, () => {
  console.log("API server is running on port 3005");
});
