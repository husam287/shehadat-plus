import db from './DB';

export default class OwnerService {
  static createTable() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Owner '
            + '('
            + 'id INTEGER PRIMARY KEY AUTOINCREMENT,'
            + 'name VARCHAR(255) NOT NULL,'
            + 'color CHARACTER(9) NOT NULL'
            + ')',
          null,
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
          'SELECT * FROM Owner',
          null,
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static insertOne({ name, color }) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Owner (name, color) values (?, ?)',
          [name, color],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static editOne({ id, name, color }) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE Owner '
          + 'SET name = ?, '
          + 'color = ? ',
          +'WHERE id == ?',
          [name, color, id],
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
          'DELETE FROM Owner WHERE id==?',
          [id],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }
}
