const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");

// Bring in predefined root and schema
const { schema, root } = require(`${__dirname}/graphql/schema.js`);

const port = 3001;

const app = express();

app.use(json());
app.use(cors());

// Single /graphql endpoint (TESTING USING GRAPHIQL)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema, // pass schema
    rootValue: root, // pass root
    graphiql: true // use graphiql interface (testing)
  })
);

// Single /graphql endpoint (LIVE ENDPOINT)
app.post(
  "/graphql",
  graphqlHTTP({
    schema: schema, // pass schema
    rootValue: root, // pass root
    graphiql: false // use graphiql interface (testing)
  })
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
