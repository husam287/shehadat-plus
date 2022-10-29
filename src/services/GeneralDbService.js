import AsyncStorage from '@react-native-async-storage/async-storage';
import { GDrive } from '@robinbobin/react-native-google-drive-api-wrapper';
import base64 from 'react-native-base64';

import * as FileSystem from 'expo-file-system';
import HandleErrors from 'hooks/handleErrors';
import showSuccessMsg from 'hooks/showSuccessMsg';
import InterestService from './InterestService';
import OwnerService from './OwnerService';
import ShehadatService from './ShehadatService';

export default class GeneralDbService {
  static removeDb() {
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`);
    AsyncStorage.setItem('hasFinishSetup', JSON.stringify(false));
  }

  static uploadDbToGoogleDrive(googleAccessToken) {
    const gdrive = new GDrive();
    gdrive.accessToken = googleAccessToken;
    gdrive.fetchTimeout = 10000;

    FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/shehadat.db`)
      .then((res) => {
        console.log('FILE URI', res.uri);
        return FileSystem.readAsStringAsync(res.uri, { encoding: 'base64' });
      })
      .then((res) => {
        const fileContent = res;
        return gdrive.files
          .newMultipartUploader()
          .setIsBase64(true)
          .setData(fileContent, 'application/x-sqlite3')
          .setRequestBody({
            name: 'shehadat.db',
          })
          .execute();
      })
      .then((res) => {
        console.log('RESULT UPLOAD =>', res);
        showSuccessMsg('Backup data successfully!');
      })
      .catch((err) => HandleErrors(err));
  }

  static getDbFromGoogleDrive(googleAccessToken) {
    // 1FHP5GNSIS4ehDGJBRFMXLYsEneY9EoOX
    const gdrive = new GDrive();
    gdrive.accessToken = googleAccessToken;
    gdrive.fetchTimeout = 10000;

    gdrive.files.getBinary('1FHP5GNSIS4ehDGJBRFMXLYsEneY9EoOX', { mimeType: 'application/x-sqlite3' })
      .then((res) => {
        const fileAsBase64 = base64.encodeFromByteArray(res);
        return FileSystem.writeAsStringAsync(
          `${FileSystem.documentDirectory}SQLite/shehadat.db`,
          fileAsBase64,
          { encoding: 'base64' },
        );
      })
      .then((res) => {
        console.log('final result=>', res);
      })
      .catch((err) => console.log(err));
  }

  static initAllTables() {
    return Promise.all([
      ShehadatService.createTable(),
      OwnerService.createTable(),
      InterestService.createTable(),
    ]);
  }
}
