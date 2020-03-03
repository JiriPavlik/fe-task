FROM neo4j

COPY synset.csv /var/lib/neo4j/import/synset.csv

EXPOSE 7474:7474
EXPOSE 7687:7687


### TODO

### open http://localhost:7474/browser/
### run following commands to fill db in neo4j command line:
### LOAD CSV FROM "file:///synset.csv" AS row FIELDTERMINATOR ';' CREATE( n:Synset {name: row[1], size: row[2]})
### CREATE INDEX FOR (n:Synset) ON (n.name)
### LOAD CSV FROM "file:///synset.csv" AS row FIELDTERMINATOR ';' MATCH (parent:Synset {name:row[0]}),(child:Synset {name:row[1]}) CREATE (parent)-[:CHILD]->(child)





