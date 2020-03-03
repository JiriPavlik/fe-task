import * as neo4j from 'neo4j-driver';

const dbUsername = process.env.DB_USERNAME || 'neo4j';
const dbPassword = process.env.DB_PASSWORD || 'neo4j';

const driver = neo4j.driver(
  'bolt://localhost',
  neo4j.auth.basic(dbUsername, dbPassword)
);

const session = driver.session();

const getChildNodes = (req, res) => {
  const parent = req.body.parent;
  session
    .run(`MATCH({name:'${parent}'})-[:CHILD]->(connected) RETURN connected`)
    .then(result => {
      const data = result.records.map(record => {
        // @ts-ignore
        return { ...record._fields[0].properties };
      });
      res.json(data);
      res.status(200);
    })
    .catch(err => res.json(err).status(500));
};

const getAllNodes = (req, res) => {
  session
    .run('MATCH (n:Synset) RETURN n')
    .then(result => {
      const data = result.records.map(record => {
        // @ts-ignore
        return { ...record._fields[0].properties };
      });

      res.json(data);
      res.status(200);
    })
    .catch(err => res.json(err).status(500));
};

const search = (req, res) => {
  const substring = req.body.substring;

  session
    .run(`MATCH (n:Synset) WHERE n.name CONTAINS '${substring}' RETURN n`)
    .then(result => {
      const data = result.records.map(record => {
        // @ts-ignore
        return { ...record._fields[0].properties };
      });

      res.json(data);
      res.status(200);
    })
    .catch(err => res.json(err).status(500));
};

const importNodes = (req, res) => {
  session
    .run(
      `LOAD CSV FROM "file:///synset.csv" AS row FIELDTERMINATOR ';' CREATE( n:Synset {name: row[1], size: row[2]})`
    )
    .then(result => {
      res.status(200);
    })
    .catch(err => res.json(err).status(500));
};

const createRelations = (req, res) => {
  session
    .run(
      `LOAD CSV FROM "file:///synset.csv" AS row FIELDTERMINATOR ';' MATCH (parent:Synset {name:row[0]}),(child:Synset {name:row[1]}) CREATE (parent)-[:CHILD]->(child)`
    )
    .then(result => {
      res.status(200);
    })
    .catch(err => res.json(err).status(500));
};

module.exports = {
  createRelations,
  importNodes,
  getChildNodes,
  getAllNodes,
  search
};
