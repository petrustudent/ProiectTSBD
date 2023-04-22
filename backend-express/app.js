const express = require("express");
var cors = require("cors");


//get /calator/:id
async function selectCalatorByCnp(req, res, cnp) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection({
      user: "oltp",
      password: "oltp",
      connectString: "localhost:1521/datawproiect.docker.internal",
    });
    // run query to get employee with employee_id
    result = await connection.execute(
      `SELECT * FROM CALATOR where cnp_calator=:cnp`,
      [cnp]
    );
  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
      } catch (err) {
        return console.error(err.message);
      }
    }
    console.log(result);
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send("query send no rows");
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//GET /calator?cnp=<id employee>
app.get("/calator", (req, res) => {
  //get query param ?id
  let cnp = req.query.cnp;
  // id param if it is number
  if (isNaN(cnp)) {
    res.send("Query param id is not number");
    return;
  }
  selectCalatorByCnp(req, res, cnp);
});


async function selectAllGara(req, res) {
    let connection;
    let result;
    try {
      connection = await oracledb.getConnection({
        user: "oltp",
        password: "oltp",
        connectString: "localhost:1521/datawproiect.docker.internal",
      });
      // run query to get employee with employee_id
      result = await connection.execute(`SELECT * FROM GARA`);
    } catch (err) {
      //send error message
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          // Always close connections
          await connection.close();
        } catch (err) {
          return console.error(err.message);
        }
      }
      console.log(result);
      if (result.rows.length == 0) {
        //query return zero employees
        return res.send("query send no rows");
      } else {
        //send all employees
        return res.send(result.rows);
      }
    }
  }
  

  //GET /gara
app.get("/gara", (req, res) => {
    selectAllGara(req, res);
  });


//get /traseu/:id_gara_plecare/:id_gara_sosire
async function selectTraseuByGara(req, res, id_gara_plecare, id_gara_sosire) {
    let connection;
    let result;
    try {
      connection = await oracledb.getConnection({
        user: "oltp",
        password: "oltp",
        connectString: "localhost:1521/datawproiect.docker.internal",
      });
      // run query to get employee with employee_id
      result = await connection.execute(
        `select id_traseu, id_tren, id_conductor, id_gara_plecare, id_gara_sosire, TO_CHAR(ora_plecare,'HH24:mi') as ora_plecare, TO_CHAR(ora_sosire,'HH24:mi') as ora_sosire, pret_standard from traseu where id_gara_plecare=:id_gara_plecare AND id_gara_sosire=:id_gara_sosire`,
        [id_gara_plecare, id_gara_sosire]
      );
    } catch (err) {
      //send error message
      return res.send(err.message);
    } finally {
      if (connection) {
        try {
          // Always close connections
          await connection.close();
        } catch (err) {
          return console.error(err.message);
        }
      }
      console.log(result);
      if (result.rows.length == 0) {
        //query return zero employees
        return res.send("query send no rows");
      } else {
        //send all employees
        return res.send(result.rows);
      }
    }
  }

  //GET /traseu?id_gara_plecare=<id>&id_gara_sosire=<id>
app.get("/traseu", (req, res) => {
    //get query param ?id
    let id_gara_plecare = req.query.id_gara_plecare;
    let id_gara_sosire = req.query.id_gara_sosire;
    // id param if it is number
    if (isNaN(id_gara_plecare) || isNaN(id_gara_sosire)) {
      res.send("Query param id is not number");
      return;
    }
    selectTraseuByGara(req, res, id_gara_plecare, id_gara_sosire);
  });


const app = express();
app.use(cors());

