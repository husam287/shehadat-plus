import db from './DB';

export default class ShehadatService {
  static createTable() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Shehadat '
            + '('
            + 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
            + 'totalMoney INT,'
            + 'type INT,'
            + 'interest INT,'
            + 'startDate CHARACTER(20),'
            + 'endDate CHARACTER(20)'
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
}
