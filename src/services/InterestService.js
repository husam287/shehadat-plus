import db from './DB';

export default class InterestService {
  static createTable() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Interest '
            + '('
            + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
            + 'shehadaId INTEGER NOT NULL, '
            + 'interestDate TEXT NOT NULL, '
            + 'moneyAmount real NOT NULL, '
            + 'CONSTRAINT fk_Shehadat '
            + 'FOREIGN KEY (shehadaId) '
            + 'REFERENCES Shehadat(id) '
            + 'ON DELETE CASCADE '
            + 'ON UPDATE CASCADE '
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
          'SELECT * FROM Interest',
          null,
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static getAllUniqueInterestDates() {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT DISTINCT interestDate FROM Interest',
          null,
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  /**
   *
   * @param {String} date date in yyyy-MM-DD
   * @returns return interests before than or equal this date grouped by dates
   */
  static getAllGroupedByDate(date) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT i.id ,interestDate, SUM(moneyAmount) as moneySummation, '
          + "GROUP_CONCAT(totalMoney, ',') as shehadatMoneyList, "
          + "GROUP_CONCAT(shehadaId, ',') as shehadaIds, "
          + "GROUP_CONCAT(o.name, ',') as owners, "
          + "GROUP_CONCAT(moneyAmount, ',') as moneyAmounts FROM Interest as i, Shehadat as s, Owner as o "
          + 'WHERE interestDate <= ? AND s.id == i.shehadaId AND o.id == s.ownerId '
          + 'GROUP BY interestDate',
          [date],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  /**
   *
   * @param {[{ shehadaId: Number, interestDate: String, moneyAmount: Number }]} arrayOfData
   * @returns
   */
  static insertMany(arrayOfData) {
    const queryValue = arrayOfData?.map((item) => (
      `(${item?.shehadaId}, "${item?.interestDate}", ${item?.moneyAmount})`
    ));

    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO Interest (shehadaId, interestDate, moneyAmount) values ${queryValue?.join(', ')}`,
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
          'DELETE FROM Interest WHERE id==?',
          [id],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static deleteByDate(interestDate) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Interest WHERE interestDate == ?',
          [interestDate],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });
    return promise;
  }

  static deleteAllBeforeOrAt(interestDate) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Interest WHERE interestDate <= ?',
          [interestDate],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }

  static deleteByShehadaId(shehadaId) {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM Interest WHERE shehadaId == ?',
          [shehadaId],
          (txObj, { rows: { _array } }) => resolve(_array),
          (txObj, error) => reject(error),
        );
      });
    });

    return promise;
  }
}
