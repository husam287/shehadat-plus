import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default {
  screenWidth: WIDTH,
  screenHeight: HEIGHT,
  bottomTabsHeight: 60,
  headerHeight: getStatusBarHeight() + 30,
};
