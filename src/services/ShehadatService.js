import db from './DB';

export default class ShehadatService {
  static createTable() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Shehadat '
          + '('
          + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
          + 'totalMoney INT CHECK (totalMoney>0), '
          + 'type INT, '
          + 'interest REAL CHECK (interest>0), '
          + 'startDate TEXT, '
          + 'endDate TEXT CHECK (endDate>startDate), '
          + 'ownerId INTEGER, '
          + 'CONSTRAINT fk_Owner '
          + 'FOREIGN KEY (ownerId) '
          + 'REFERENCES Owner(id) '
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
    ownerId,
  }) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Shehadat (totalMoney, type, interest, startDate, endDate, ownerId) values (?, ?, ?, ?, ?, ?)',
          [money, type, interest, startDate, endDate, ownerId],
          (txObj, { insertId }) => resolve({
            id: insertId, money, interest, type, startDate, endDate,
          }),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static editOne({
    id,
    money,
    type,
    interest,
    startDate,
    endDate,
    ownerId,
  }) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE Shehadat '
          + 'SET totalMoney = ?, '
          + 'type = ?, '
          + 'interest = ?, '
          + 'startDate = ?, '
          + 'endDate = ?, ',
          +'ownerId = ? ',
          +'WHERE id == ?',
          [money, type, interest, startDate, endDate, ownerId, id],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static getAll(ownerId) {
    const queryWithoutOwnerId = 'SELECT s.*, o.color, o.name FROM Shehadat as s, Owner as o '
    + 'WHERE s.ownerId == o.id';

    const queryWithOwnerId = 'SELECT s.*, o.color, o.name FROM Shehadat as s, Owner as o '
    + 'WHERE s.ownerId == o.id '
    + `AND s.ownerId == ${ownerId}`;

    const finalSqlQuery = ownerId ? queryWithOwnerId : queryWithoutOwnerId;

    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          finalSqlQuery,
          null,
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static deleteOne(id) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Shehadat WHERE id==?',
          [id],
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
          `SELECT s.*, o.color, o.name FROM Shehadat as s, Owner as o WHERE s.id = ${id} AND s.ownerId = o.id`,
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
