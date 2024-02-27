import express from "express"
import cors from "cors"
import mysql from "mysql";

const app = express();

app.use(cors());
app.use(express.json());


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crick_db"
});

con.connect(function(err){
  if(err) throw err;
  console.log("Connected");
})


app.get('/app/constituencies/', (req, res) => {
  const query = 'SELECT distinct constituency_name, district_name FROM constituencies WHERE district_name = "Hyderabad" OR district_name = "Ranga Reddy"';
  con.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    //  console.log(results); // Move this line inside the callback
    res.json(results);
  });
});

app.get('/app/teams/', (req, res) => {
  const query = 'SELECT distinct team_name FROM mclteams';
  con.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    //  console.log(results); // Move this line inside the callback
    res.json(results);
  });
});


app.post('/app/teamregister', (req, res) => {
  const {name,constituencyName,captainName,captainEmail,captainMobile,otherTeamName} = req.body;
  console.log(name, constituencyName, captainName, captainEmail, captainMobile, otherTeamName);
  res.status(200).json({messgae:"THis is working"})
  // let teamNameValue = formData.name;
  // if(formData.name === 'Other'){
  //   teamNameValue = formData.otherTeamName;
  //   console.log(teamNameValue);
  // }
  // else{
  //   console.log(teamNameValue);
  // }
 
});





app.listen(8082, ()=>{
    console.log("Listening");
})