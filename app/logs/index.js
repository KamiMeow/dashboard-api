function logging(req, res, next) {
  const now = new Date();
  const day = now.getDay();
  const month = now.getMonth();
  const year = now.getFullYear();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  let data = '-----------------------------------';
  data += `Date: ${[day, month, year].join('.')}`;
  data += `Time: ${[hour, minutes, seconds].join(':')}`;
  data += `Method: ${req.method}`;
  data += `URL: ${req.url}`;
  data += `User agent: ${req.get("user-agent")}`
  data += '-----------------------------------';
  console.log(data);
  fs.appendFile("server.log", data + "\n", function(){});
  next();
};

module.exports = logging;
