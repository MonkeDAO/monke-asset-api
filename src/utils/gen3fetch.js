require("dotenv").config();
const heliusTk = process.env.heliusTk;
const url = `https://mainnet.helius-rpc.com/?api-key=${heliusTk}`;
const fs = require("fs");
const path = require("path");
let start = Date.now();
let timeout = 60 * 60000;

console.log(heliusTk);
const getAssetsByGroup = async () => {
  if (Date.now() - start >= timeout) {
    console.log("Timeout reached, exiting loop.");
    return;
  }
  console.time("getAssetsByGroup"); // Start the timer
  let page = 1;
  let assetList = [];

  while (page) {
    if (Date.now() - start >= timeout) {
      console.log("Timeout reached, exiting loop.");
      return;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAssetsByGroup",
        params: {
          groupKey: "collection",
          groupValue: "8Rt3Ayqth4DAiPnW9MDFi63TiQJHmohfTWLMQFHi4KZH",
          page: page,
          limit: 1000,
        },
      }),
    });
    const { result } = await response.json();

    if (result.total !== 1000) {
      page = null;
    } else {
      page++;
      assetList.push(...result.items);
    }
    setTimeout(timedWhileLoop, 0);
  }
  const resultData = {
    totalResults: assetList.length,
    results: assetList,
  };

  fs.writeFileSync("../data/gen3List.json", JSON.stringify(assetList, null, 2), "utf-8");

  console.log("Uploaded Gen3 Assets");
};

setInterval(() => {
  getAssetsByGroup();
}, 60 * 60 * 1000); //  set this to run every second for testing, and later set it to required time limit for production
