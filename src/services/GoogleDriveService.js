import { GDrive, ListQueryBuilder } from '@robinbobin/react-native-google-drive-api-wrapper';
import base64 from 'react-native-base64';
import * as FileSystem from 'expo-file-system';
import showSuccessMsg from 'hooks/showSuccessMsg';
import HandleErrors from 'hooks/handleErrors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class GoogleDriveService {
  static async uploadDbToGoogleDrive(googleAccessToken) {
    const gdrive = new GDrive();
    gdrive.accessToken = googleAccessToken;
    gdrive.fetchTimeout = 10000;

    let storedFileId;

    return AsyncStorage.getItem('backupFileId')
      .then((res) => {
        storedFileId = res || null;
        return FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/shehadat.db`);
      })
      .then((res) => FileSystem.readAsStringAsync(res.uri, { encoding: 'base64' }))
      .then((res) => {
        const fileContent = res;
        return gdrive.files
          .newMultipartUploader()
          .setIsBase64(true)
          .setIdOfFileToUpdate(storedFileId)
          .setData(fileContent, 'application/x-sqlite3')
          .setRequestBody({
            name: 'shehadat.db',
          })
          .execute();
      })
      .then((res) => {
        AsyncStorage.setItem('backupFileId', res?.id);
        showSuccessMsg('Backup data successfully!');
      })
      .catch((err) => HandleErrors(err));
  }

  static async getDbFromGoogleDrive(googleAccessToken) {
    const gdrive = new GDrive();
    gdrive.accessToken = googleAccessToken;
    gdrive.fetchTimeout = 10000;

    return gdrive.files.list({
      q: new ListQueryBuilder()
        .e('name', 'shehadat.db'),
    })
      .then((res) => {
        const fileId = res?.files?.[0]?.id;
        if (!fileId) {
          throw new Error({ message: 'No Backup Data Found!' });
        }
        AsyncStorage.setItem('backupFileId', fileId);
        return gdrive.files.getBinary(fileId, { mimeType: 'application/x-sqlite3' });
      })
      .then((res) => {
        const fileAsBase64 = base64.encodeFromByteArray(res);
        return FileSystem.writeAsStringAsync(
          `${FileSystem.documentDirectory}SQLite/shehadat.db`,
          fileAsBase64,
          { encoding: 'base64' },
        );
      })
      .then(() => {
        showSuccessMsg('Loaded Data Successfully!');
      })
      .catch((err) => HandleErrors(err));
  }
}
