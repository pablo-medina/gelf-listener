const gelfserver = require('graygelf/server');
const chalk = require('chalk');
const server = gelfserver();

// TODO: Usar dotenv
const PORT = 22201;

function convertGELFLogLevel(number) {
  let level = '';
  let color;
  let bgColor;

  switch (number) {
    case 0:
      level = 'EMERGENCY';
      color = chalk.red.bold;
      bgColor = chalk.bgRed.bold;
      break;
    case 1:
      level = 'ALERT';
      color = chalk.redBright;
      bgColor = chalk.bgRed;
      break;
    case 2:
      level = 'CRITICAL';
      color = chalk.redBright;
      bgColor = chalk.bgRed;
      break;
    case 3:
      level = 'ERROR';
      color = chalk.redBright;
      bgColor = chalk.bgRed;
      break;
    case 4:
      level = 'WARNING';
      color = chalk.yellowBright;
      bgColor = chalk.bgYellow;
      break;
    case 5:
      level = 'NOTICE';
      color = chalk.yellowBright;
      bgColor = chalk.bgYellow;
      break;
    case 6:
      level = 'INFO';
      color = chalk.greenBright;
      bgColor = chalk.bgGreen;
      break;
    case 7:
      level = 'DEBUG';
      color = chalk.blueBright;
      bgColor = chalk.bgBlue;
      break;
    default:
      level = 'UNKNOWN';
      color = chalk.white;
      bgColor = chalk.bgGray;
  }

  return {level, color, bgColor};
}

server.on('message', function (msg) {    
  const logLevelData = convertGELFLogLevel(msg.level);

  console.log(logLevelData.bgColor(`[${logLevelData.color(logLevelData.level)}] ${chalk.yellowBright(msg.host)} - ${logLevelData.color(msg.short_message)}`));
  const extraValues = {};
  
  for (const key in msg) {
    if (key.startsWith('_')) {      
      const parsedKey = key.substring(1);
      const parsedValue = msg[key];
      extraValues[parsedKey] = parsedValue;      
    }
  }

  if (Object.entries(extraValues).length > 0) {
    for (const key in extraValues) {      
      console.log(`${logLevelData.color(key)}: ${chalk.whiteBright(extraValues[key])}`);
    }
    console.log('');
  }
})
server.listen(22201);
console.log(`gelf-listener started at port ${chalk.yellow(PORT)}.`);

