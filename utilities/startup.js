var dataAccess = require('../utilities/data_access');


async function createTable() {
    var sql = `
    CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fixed_title TEXT,
        sport TEXT,
        play_year TEXT
    );

    CREATE TABLE IF NOT EXISTS sports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fixed_title TEXT,
    );
    `
    return await dataAccess.Execute(sql);
}

async function insertSports() {
    var sql = `
    INSERT INTO sports (fixed_title)
    VALUES ('Baseball'),
           ('Football')
    `;
    return await dataAccess.Execute(sql);
}

async function insertSchedules() {
    var sql = `
    INSERT INTO schedules (fixed_title, sport_id, play_year)
    VALUES ('2021 Baseball Schedule', 1, '2021'),
           ('2020 Baseball Schedule', 1, '2020'),
           ('2019 Baseball Schedule', 1, '2019'),
           ('2018 Baseball Schedule', 1, '2018'),
           ('2017 Baseball Schedule', 1, '2017'),
           ('2016 Baseball Schedule', 1, '2016'),
           ('2015 Baseball Schedule', 1, '2015'),
           ('2020 Football Schedule', 2, '2020'),
           ('2019 Football Schedule', 2, '2019'),
           ('2018 Football Schedule', 2, '2018'),
           ('2017 Football Schedule', 2, '2017'),
           ('2016 Football Schedule', 2, '2016'),
           ('2015 Football Schedule', 2, '2015')
    `;
    return await dataAccess.Execute(sql);
}

async function startupProcess() {
    var created = await createTable();
    console.log(created)
    var schedules = await dataAccess.GetRows('SELECT * FROM schedules');
    if (!schedules.length > 0)
    {
        var inserted = await insertSchedules();
        console.log(inserted);
        inserted = await insertSports();
        console.log(inserted);
    }
}

module.exports = startupProcess;