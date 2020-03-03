# Panoramic

Steps to run project

install dependencies 

yarn install

start express app 
yarn start api

uncomment and run for file download 
// downloadDataFile();

uncomment and run for create csv file for db data import 
// writeDataIntoCsv();

DB setup


run dockerfile via:
docker image build -t neo4j .
docker container run -p7474:7474 -p7687:7687 --detach --name neo4j neo4j

open http://localhost:7474/browser/
setup username/login as neo4j/neo4jDocker!4

run following commands to fill db in neo4j command line:
LOAD CSV FROM "file:///synset.csv" AS row FIELDTERMINATOR ';' CREATE( n:Synset {name: row[1], size: row[2]})
CREATE INDEX FOR (n:Synset) ON (n.name)
LOAD CSV FROM "file:///synset.csv" AS row FIELDTERMINATOR ';' MATCH (parent:Synset {name:row[0]}),(child:Synset {name:row[1]}) CREATE (parent)-[:CHILD]->(child)

run frontend app by:
yarn start












