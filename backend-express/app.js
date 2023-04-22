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

  async function selectLocByTraseu(req, res, id_traseu, data) {
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
        `select id_loc, v.id_vagon, nr_loc, clasa, t.id_tren from traseu t inner join tren tr on t.id_tren = tr.id_tren inner join vagon_tren vg on tr.id_tren = vg.id_tren inner join vagon v on v.id_vagon = vg.id_vagon inner join loc l on v.id_vagon = l.id_vagon
        MINUS
        select b.id_loc, v.id_vagon, l.nr_loc, v.clasa, t.id_tren
        from bilet b inner join loc l on b.id_loc = l.id_loc inner join vagon v on l.id_vagon = v.id_vagon inner join traseu t on b.id_traseu = t.id_traseu where TRUNC(b.data_plecare) = TO_DATE(:data,'dd/mon/yyyy') AND t.id_traseu = :id_traseu;
        `,
        [data, id_traseu]
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

  //GET /loc?id_traseu=<id>
// bod - data
app.get("/loc", (req, res) => {
    //get query param ?id
    let id_traseu = req.query.id_traseu;
    let data = req.body.data;
    // id param if it is number
    if (isNaN(id_traseu)) {
      res.send("Query param id is not number");
      return;
    }
    selectLocByTraseu(req, res, id_traseu, data);
  });

  async function cerere1(req, res) {
    let connection;
    let result;
    try {
      connection = await oracledb.getConnection({
        user: "dw",
        password: "dw",
        connectString: "localhost:1521/datawproiect.docker.internal",
      });
      // run query to get employee with employee_id
      result = await connection.execute(
        `SELECT denumire_gara_sosire AS destinatie, luna, bilete_vandute FROM ( SELECT tr.denumire_gara_sosire, tp.luna, SUM(cantitate) AS bilete_vandute, MAX(SUM(cantitate)) OVER( PARTITION BY tp.luna ) AS max_val FROM bilete_vandute bv, traseu tr, timp tp WHERE bv.id_traseu = tr.id_traseu AND bv.id_timp_plecare = tp.id_timp AND tp.an = 2022 GROUP BY tr.denumire_gara_sosire, tp.luna ) WHERE bilete_vandute = max_val`
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

  app.get("/cerere1", (req, res) => {
    //get query param ?id
    cerere1(req, res);
  });


const app = express();
app.use(cors());

