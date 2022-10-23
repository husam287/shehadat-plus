import db from './DB';

export default class ShehadatService {
  static createTable() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Shehadat '
          + '('
          + 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
          + 'totalMoney INT CHECK (totalMoney>0),'
          + 'type INT,'
          + 'interest REAL CHECK (interest>0),'
          + 'startDate TEXT,'
          + 'endDate TEXT CHECK (endDate>startDate)'
          + ')',
          null,
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static insertInto({
    money,
    type,
    interest,
    startDate,
    endDate,
  }) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Shehadat (totalMoney, type, interest, startDate, endDate) values (?, ?, ?, ?, ?)',
          [money, type, interest, startDate, endDate],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static getAll() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM Shehadat',
          null,
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static getOne(id) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM Shehadat WHERE id = ${id}`,
          null,
          (txObj, { rows: { _array } }) => resolve(_array?.[0]),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static getTotalMoneyAmount() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT SUM(totalMoney) as summationOfMoney FROM Shehadat',
          null,
          (txObj, { rows: { _array } }) => resolve(_array?.[0]),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }
}
