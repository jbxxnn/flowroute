// pages/api/mysql.js

import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'cleancer_jbxxnn',
  password: '080Connect2jib',
  database: 'cleancer_flowbill',
});

export default connection;