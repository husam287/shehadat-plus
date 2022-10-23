import moment from 'moment';

/**
 *
 * @returns Today date in yyyy-MM-DD format
 */
export default function getTodayDate() {
  return moment().format('yyyy-MM-DD');
}
