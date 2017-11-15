import React, { Component } from 'react';
import {
  Alert,
  Animated,
  AppRegistry,
  Button,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { connect } from 'react-redux'

import StampComm from './CommissaryStamps';
import StoreComm from './CommissaryStore';

class CommissaryClass extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

        <View>
          <Text style={ styles.tradeHead }>Store</Text>
          { this.props.pos.map( (p, idx) => {
              return <StoreComm
                        key={ idx }
                        partOfSpeech={ p.title }
                        show={ p.show }
                      ></StoreComm>
          })}
          <Text style={ styles.tradeHead } >Stamp Inventory</Text>
          <ScrollView style={ styles.stampContainerStyle } >
            { this.props.stamps.map( (stamp, idx) => {
                return <StampComm
                          key={ idx }
                          stampProps={ stamp }
                          stampButtonStyles={ styles.stampButtonStyles }
                          stampTextStyles={ styles.stampTextStyles }
                        ></StampComm>
            })}
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  tradeHead: {
    color: 'white',
    fontSize: Dimensions.get('window').height/40,
    margin: 5,
    textAlign: 'center',
    backgroundColor: '#F75F48',
  },
  tradeContainerStyle: {
    backgroundColor: 'blue',
    paddingVertical: 20,
    height: Dimensions.get('window').height/3,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
  stampContainerStyle: {
    backgroundColor: 'green',
    paddingVertical: 20,
    height: Dimensions.get('window').height/2,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
  stampButtonStyles: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    margin: 5,
  },
  stampTextStyles: {
    padding: 5,
    textAlign: 'center',
    color: 'darkgreen',
    fontWeight: 'bold',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 3,
  },
});

const mapStateToProps = (state) => {
  return { ...state };
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateSentence: ( changeIDs ) => {
//       dispatch( updateSentence( changeIDs ) );
//     },
//   }
// }

CommissaryClass = connect(
  mapStateToProps
  // mapDispatchToProps
)(CommissaryClass);

export default CommissaryClass;