const fs = require('fs');

function logging(req, res, next) {
  const now = new Date();
  const day = now.getDay();
  const month = now.getMonth();
  const year = now.getFullYear();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  let data = '-----------------------------------\n';
  data += `Date: ${[day, month, year].join('.')}\n`;
  data += `Time: ${[hour, minutes, seconds].join(':')}\n`;
  data += `Method: ${req.method}\n`;
  data += `URL: ${req.url}\n`;
  data += `User agent: ${req.get("user-agent")}\n`;
  data += '-----------------------------------';

  console.log(data);

  fs.appendFileSync("logs/server.log", data + "\n");
  next();
};

module.exports = logging;
