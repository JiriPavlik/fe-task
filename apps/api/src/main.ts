import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as http from 'http';
import * as bodyParser from 'body-parser';
// @ts-ignore
import { getParentNodeName } from '@panoramic/utils';
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const db = require('./db/queries');

const app = express();

// http headers basic security setup
app.use(helmet());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const parser = new xml2js.Parser();

const flattenSynset = {};

// check if items with name already in data
const checkIfAlreadyItemExists = name => {
  return flattenSynset[name] !== undefined;
};

const linearisation = (obj, parentName) => {
  const newParentName =
    parentName !== '' ? `${parentName} > ${obj.$.words}` : `${obj.$.words}`;

  /* recursion ending condition */
  if (!obj.synset) {
    /* ignore possible duplicates in data */
    if (checkIfAlreadyItemExists(newParentName)) {
      return 0;
    }

    flattenSynset[newParentName] = { name: newParentName, size: 0 };
    return 1;
  } else {
    let count = 0;
    obj.synset.forEach(item => {
      count = count + linearisation(item, newParentName);
    });

    /* ignore possible duplicates in data */
    if (checkIfAlreadyItemExists(newParentName)) {
      return count;
    }

    flattenSynset[newParentName] = { name: newParentName, size: count };
    return count + 1;
  }
};

const downloadDataFile = async () => {
  console.log('data download');
  const filestream = fs.createWriteStream('synset.xml');
  http.get(
    'http://s3.amazonaws.com/static.operam.com/assignment/structure_released.xml',
    res => {
      res.pipe(filestream);
      console.log('finish synset file download');
    }
  );
};

/* Converts xml data into csv format for db insertion */
const writeDataIntoCsv = () => {
  console.log('write data into csv');
  fs.readFile('./synset.xml', function(err, data) {
    console.log('start reading file');
    parser.parseString(data, function(err, result) {
      if (err) throw err;

      if (result) {
        const obj = result.ImageNetStructure.synset[0];
        linearisation(obj, '');

        const synsetCsvStream = fs.createWriteStream('synset.csv');

        Object.keys(flattenSynset).map(synset => {
          const parent = getParentNodeName(flattenSynset[synset].name);

          synsetCsvStream.write(
            `${parent};${flattenSynset[synset].name};${flattenSynset[synset].size}\n`
          );
        });

        synsetCsvStream.end();

        synsetCsvStream
          .on('finish', () => {
            console.log('finish synset stream into csv');
          })
          .on('error', err => {
            console.log(err);
          });
      }
    });
  });
};

// downloadDataFile();
// writeDataIntoCsv();

/* allow cors, ideally should be solved by ngnix proxy */
app.options('/data', cors());
app.get('/data', cors(), db.getAllNodes);

app.options('/search', cors());
app.post('/search', cors(), db.search);

/* Endpoint to get node direct childrens */
app.options('/childrens', cors());
app.post('/childrens', cors(), db.getChildNodes);

app.get('/db', db.importNodes);
app.get('/dbRel', db.createRelations);

const port = process.env.port || 4000;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
