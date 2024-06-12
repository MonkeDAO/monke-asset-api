const fs = require("fs");
const path = require("path");

function findImageUrisByName(data, name) {
  return data.filter((entry) => entry.mint.name === name).map((entry) => entry.mint.imageUri);
}

function findGen3ImageUrisByName(data, name) {
  return data
    .filter((entry) => entry.content.metadata.name === name)
    .map((entry) => entry.content.links.image);
}

function findTraitByName(data, name, traitt) {
  const entry = data.find((entry) => entry.mint.name === name);
  if (entry) {
    const trait = entry.mint.attributes.find((attr) => attr.trait_type === traitt);
    return trait ? trait.value : null;
  } else {
    return null;
  }
}

function findGen3TraitByName(data, name, traitt) {
  const entry = data.find((entry) => entry.content.metadata.name === name);
  if (entry) {
    const trait = entry.content.metadata.attributes.find((attr) => attr.trait_type === traitt);
    return trait ? trait.value : null;
  } else {
    return null;
  }
}

function findAllTraits(data, name) {
  const entry = data.find((entry) => entry.mint.name === name);
  if (entry) {
    return entry.mint.attributes;
  }
}

module.exports = {
  findImageUrisByName,
  findGen3ImageUrisByName,
  findTraitByName,
  findGen3TraitByName,
  findAllTraits,
};
