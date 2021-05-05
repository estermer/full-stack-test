var dataAccess = require('../utilities/data_access');


async function createTable() {
    var sql = `
    CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        sport TEXT,
        year TEXT
    );`
    return await dataAccess.Execute(sql);
}

async function insertSchedules() {

    var sql = `
    INSERT INTO schedules (title, sport, year)
    VALUES ('2021 Baseball Schedule', 'baseball', '2021'),
           ('2020 Baseball Schedule', 'baseball', '2020'),
           ('2019 Baseball Schedule', 'baseball', '2019'),
           ('2018 Baseball Schedule', 'baseball', '2018'),
           ('2017 Baseball Schedule', 'baseball', '2017'),
           ('2016 Baseball Schedule', 'baseball', '2016'),
           ('2015 Baseball Schedule', 'baseball', '2015'),
           ('2020 Football Schedule', 'football', '2020'),
           ('2019 Football Schedule', 'football', '2019'),
           ('2018 Football Schedule', 'football', '2018'),
           ('2017 Football Schedule', 'football', '2017'),
           ('2016 Football Schedule', 'football', '2016'),
           ('2015 Football Schedule', 'football', '2015')
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
        console.log(inserted)
    }
}

module.exports = startupProcess;