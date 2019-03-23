
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const { FaceResponse  } = require('./models');

require('dotenv').config();

const { URL, API_KEY } = process.env;

const contentType = "application/json";
// john and brian
const imageUrl = "https://johnpapa.net/content/images/2016/05/5pbp-angular-i18n.png"

const body = JSON.stringify({
  url: imageUrl
});

function getFaces() {
  console.log(`Calling API: ${URL}, with image url: ${imageUrl}`);
  fetch(URL, { 
    headers: {
    "Ocp-Apim-Subscription-Key": API_KEY,
    "Content-Type": contentType
    },
    method: "POST",
    body: body
  })
    .then(res => res.json())
    .then(json => { 
      console.log(json);
      fs.writeFile(path.join(__dirname, "output.json"), JSON.stringify(json), 'utf-8',(err) => {
        if(err) console.error('Err', err)
        else console.log('File content written to ' + 'output.json');
      })
    });
}

function parseFaces() {
  const res = fs.readFileSync(path.join(__dirname, "output.json"), 'utf-8');
  const json = JSON.parse(res);
  new FaceResponse(json);
}

// this will parse an existing response at output.json, so run getFaces() at least once
parseFaces();

// this will perform an HTTP request
//getFaces();

