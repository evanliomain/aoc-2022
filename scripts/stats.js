const pkg = require('../package.json');
let aocYear = pkg.aocYear;
const chalk = require('chalk');
const T = require('taninsam');

const format = require('date-fns/fp/format');
const parse = require('date-fns/fp/parse');
const addDays = require('date-fns/fp/addDays');
const addMinutes = require('date-fns/fp/addMinutes');
const addHours = require('date-fns/fp/addHours');

const tendancySpec = require('../stats/tendancy.vg.json');
const classementSpec = require('../stats/classement3.vg.json');
const treemapSpec = require('../stats/treemap.vg.json');
const hotHoursSpec = require('../stats/hot-hours.vg.json');
const hotHoursConfig = require('../stats/hot-hours.config.json');

const dataFallback = require('../data/leaderboard.json');

const generateChartFile = require('../stats/generate-chart-file');
const getData = require('../stats/get-data');
const {
  statsToChartData,
  rawToResult,
  isRawValid
} = require('../stats/stats-to-chart-data');
const writeFile = require('../stats/write-file');
const then = require('../tools/then');
const log = require('../tools/log');
const { extractStats } = require('../utils/extract-args');

const execCommand = require('../utils/exec-command');

const fs = require('fs');
const rimraf = require('rimraf');

const leaderboard = require('../leaderboard.json');

// Because they can be bugs, some days may worth no points.
const daysWithNoPoint = pkg.daysWithNoPoint;

const width = 1000;
const height = 1200;

async function main() {
  rimraf.sync('dist');
  fs.mkdirSync('dist/classement', { recursive: true });
  // Extract arguments
  let { day } = extractStats(process.argv);

  console.log(
    'Get stats data from AoC: ' +
      [
        chalk.magenta(`year: `, chalk.bold(aocYear)),
        chalk.green(`day:`, chalk.bold(day)),
        chalk.cyan(`leaderboard: `, chalk.bold(leaderboard))
      ].join(' - ')
  );

  // Replace data call by a local file in case of timeout
  const data = await getData({ year: aocYear, leaderboard });
  // const data = dataFallback;

  await writeFile(`dist/data-raw-${aocYear}-${day}-${leaderboard}.json`)(
    JSON.stringify(data, 2)
  );

  isRawValid(data);

  console.log('Transform data');

  let year = 2021;
  month = '12';

  const chartData = statsToChartData(year, month, day, daysWithNoPoint)(data);
  await writeFile(`dist/data-${year}-${day}-${leaderboard}.json`)(
    JSON.stringify(chartData, 2)
  );

  // Generate Tendancy
  // console.log(`Generating tendancy-${year} chart`);
  // await generateChartFile(tendancySpec, {
  //   chartName: `tendancy-${year}-${day}`,
  //   width,
  //   height,
  //   dwidth: -300
  // })(chartData).then(
  //   log(path => 'Tendancy chart generated at ' + chalk.blue(path))
  // );

  // Generate Classement by day
  console.log(`Generating classement-* chart`);
  await generateClassments(year, month, chartData, day);

  /*
  console.log(`Generating classement animation chart`);
  await execCommand(
    `convert -delay 100 -loop 1 dist/classement/*.png dist/classement-${year}-${day}.gif`
  );
  rimraf.sync('dist/classement');
  console.log(
    'Animated chart generated at ' +
      chalk.blue(`dist/classement-${year}-${day}.gif`)
  );
  */

  // Generate hothours chart
  // const result = rawToResult(daysWithNoPoint)(data);
  // await writeFile(`dist/data-result-${year}-${day}-${leaderboard}.json`)(
  //   JSON.stringify(result, 2)
  // );
  // await generateChartFile(hotHoursSpec, {
  //   chartName: `hot-hours-${year}-${day}`,
  //   width: 1000,
  //   height: 300,
  //   dwidth: -400,
  //   config: hotHoursConfig
  // })(result).then(
  //   log(path => 'Hot hours chart generated at ' + chalk.blue(path))
  // );

  console.log(chalk.green('Charts generated'));
}

main().catch(error => {
  console.log(chalk.red(error));
  console.log(chalk.grey('----------'));
  console.log(error);
});

function getDate(year, month, numeroDay) {
  return i =>
    T.chain(`${year}-${month}-${numeroDay}T00:00:00.000-05`)
      .chain(parse(new Date())("yyyy-MM-dd'T'HH:mm:ss.SSSx"))
      // .chain(addDays(i))
      // .chain(addMinutes(i))
      .chain(addHours(i))
      .chain(format("yyyy-MM-dd'T'HH:mm:ss"))
      .value();
}

function getDateForSubtitle(year, numeroDay) {
  return (
    T.chain(`${year}-${month}-${numeroDay}T00:00:00.000-05`)
      .chain(parse(new Date())("yyyy-MM-dd'T'HH:mm:ss.SSSx"))
      .chain(format('dd/MM/yyyy'))
      // .chain(format("'Jour 'dd"))
      .value()
  );
}

async function generateClassments(year, month, chartData, numeroDay) {
  // for (let i = 1; i <= parseInt(numeroDay, 10); i++) {
  //   await generateClassment(year, chartData, String(i).padStart(2, '0'))(23);
  // }

  const gen = generateClassment(year, month, chartData, numeroDay);
  // // const minutes = makeArray(x => 15 * x)(24 * 4);
  // // for (let i = 0; i < minutes.length; i++) {
  // //   await gen(minutes[i]);
  // // }

  // // const n = 24;
  // // for (let i = 0; i < n; i++) {
  // //   await gen(i);
  // // }

  await gen(23);
}

function generateClassment(year, month, chartData, numeroDay) {
  const toDate = getDate(year, month, numeroDay);
  const subtitle = getDateForSubtitle(year, month, numeroDay);
  return async i => {
    const date = toDate(i);
    // const chartName= `classement/classement-${date.replace(/:/g, '_')}`;
    const chartName = `classement/classement-${year}-${numeroDay}`;
    classementSpec.title = { text: `Classement AoC ${aocYear}`, subtitle };

    treemapSpec.title = { text: `Classement AoC ${aocYear}` };

    // await generateChartFile(
    //   classementSpec,
    //   {
    //     chartName,
    //     width: 1000,
    //     height: 2000,
    //     dwidth: 200
    //   },
    //   [
    //     {
    //       name: 'scoreDate',
    //       value: date
    //     }
    //   ]
    // )(chartData).then(
    //   log(path => 'Temporary chart generated at ' + chalk.grey(path))
    // );

    await generateChartFile(
      treemapSpec,
      {
        chartName: `${chartName}_treemap`,
        width: 2000,
        height: 1000,
        dwidth: 200
      },
      [
        {
          name: 'scoreDate',
          value: date
        }
      ]
    )(chartData).then(log(path => 'Treemap classement at ' + chalk.blue(path)));
  };
}
