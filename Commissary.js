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
          <ScrollView style={ styles.tradeContainerStyle } >
            { this.props.pos.map( (p, idx) => {
                return <StoreComm
                          key={ idx }
                          partOfSpeech={ p.title }
                          show={ p.show }
                        ></StoreComm>
            })}
          </ScrollView>
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
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: Dimensions.get('window').height/40,
    textAlign: 'center',
    backgroundColor: '#F75F48',
  },
  tradeContainerStyle: {
    backgroundColor: 'white',
    paddingVertical: 5,
    height: Dimensions.get('window').height/3,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'left',
    flexWrap: 'wrap',
  },
  stampContainerStyle: {
    backgroundColor: 'white',
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