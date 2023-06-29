import {colors} from '@/styles';
import {StyleSheet} from 'react-native';

const AVATAR_WIDTH = 90;
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 30,
  },
  avatar: {
    width: AVATAR_WIDTH,
    height: AVATAR_WIDTH,
    borderRadius: AVATAR_WIDTH / 2,
    alignSelf: 'center',
    borderWidth: 1,
  },
  headerSection: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 30,
    textTransform: 'uppercase',
  },
});
