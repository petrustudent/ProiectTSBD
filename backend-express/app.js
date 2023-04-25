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



const app = express();
app.use(cors());

