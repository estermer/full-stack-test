const sqlite3 = require('sqlite3').verbose();
const Promise = require('bluebird');

class DataAccess {
  static OpenConnection() {
    this.db = new sqlite3.Database('schedules.db', (err) => {
      if (err) {
        console.log("Didn't Connect", err);
      } else {
        console.log("Connected");
      }
    });
  }

  static _Run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  static _Get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, function (err, result) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static _All(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, function (err, rows) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Execute(sql, params = []) {
    this.OpenConnection();
    let returnValue = await this._Run(sql, params);
    this.db.close();
    return returnValue;
  }

  static async GetRows(sql, params = []) {
    this.OpenConnection();
    let returnValue = await this._All(sql, params);
    this.db.close();
    return returnValue;
  }

  static async GetRow(sql, params = []) {
    this.OpenConnection();
    let returnValue = await this._Get(sql, params);
    this.db.close();
    return returnValue;
  }
}

module.exports = DataAccess;