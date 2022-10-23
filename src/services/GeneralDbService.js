import * as FileSystem from 'expo-file-system';
import OwnerService from './OwnerService';
import ShehadatService from './ShehadatService';

export default class GeneralDbService {
  static removeDb() {
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`);
  }

  static initAllTables() {
    return Promise.all([
      ShehadatService.createTable(),
      OwnerService.createTable(),
    ]);
  }
}
