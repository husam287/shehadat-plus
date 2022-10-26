import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import InterestService from './InterestService';
import OwnerService from './OwnerService';
import ShehadatService from './ShehadatService';

export default class GeneralDbService {
  static removeDb() {
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`);
    AsyncStorage.setItem('hasFinishSetup', JSON.stringify(false));
  }

  static initAllTables() {
    return Promise.all([
      ShehadatService.createTable(),
      OwnerService.createTable(),
      InterestService.createTable(),
    ]);
  }
}
