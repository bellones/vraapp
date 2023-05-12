/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 8,
  },
  item: {
    width: '48%',
    alignItems: 'flex-start',
    padding: 4,
    borderRadius: 8,
  },
  innerText: {
    paddingLeft: 2,
    paddingTop: 2,
    fontWeight: '400',
    color: '#000',
  },

  image: {
    borderRadius: 6 ,
    width : '100%',
    height: 96,
  },
});
