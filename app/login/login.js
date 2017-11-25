import React, { Component } from 'react';
import { Alert, Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';

import Styles from '../css/styles.js'

class LoginModal extends Component {

  state = {
      loginModalVisible: true,
      regModalVisible: false,
      username: 'username',
      password: 'password',
      first_name: 'first name',
      last_name: 'last name',
      email_address: 'email address',
  }

  loginModalClick(visible) {
    console.log("USERNAME ", this.state.username, " PW: ", this.state.password);
    this.setState({loginModalVisible: visible});
  }

  regModalClick(visible) {
    console.log("USERNAME ", this.state.username, " PW: ", this.state.password);
    console.log("FIRST NAME ", this.state.first_name, " LAST: ", this.state.last_name);
    console.log("EMAIL ", this.state.email_address);
    this.setState({regModalVisible: visible});
  }

  render() {
    return (

        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.loginModalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={Styles.loginModal}>
            <View>
              <Text style= {Styles.title} >SENTENCED</Text>
              <Text style= {Styles.plainText} >Please login to get Sentenced!</Text>
              <TextInput
                style={Styles.inputBox}
                onChangeText={(username) => this.setState({username})}
                placeholder={this.state.username}
                autoCapitalize={ 'none' }
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(password) => this.setState({password})}
                placeholder={this.state.password}
                secureTextEntry={true}
                autoCapitalize={ 'none' }
              />
              <TouchableHighlight
                style={Styles.button}
                onPress={() => {
                this.loginModalClick(!this.state.loginModalVisible)
              }}>
                <Text style={Styles.buttonText} >Login</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={Styles.button}
                onPress={() => {
                  this.loginModalClick(!this.state.loginModalVisible)
                  this.regModalClick(!this.state.regModalVisible)
                }}>
                  <Text style={Styles.buttonText} >Register</Text>
              </TouchableHighlight>

            </View>
           </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.regModalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={Styles.loginModal}>
            <View>
              <Text style= {Styles.title} >SENTENCED</Text>
              <Text style= {Styles.plainText} >Please complete all information so you can get Sentenced!</Text>
              <TextInput
                style={Styles.inputBox}
                onChangeText={(username) => this.setState({username})}
                placeholder={this.state.username}
                autoCapitalize={ 'none' }
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(password) => this.setState({password})}
                placeholder={this.state.password}
                secureTextEntry={true}
                autoCapitalize={ 'none' }
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(first_name) => this.setState({first_name})}
                placeholder={this.state.first_name}
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(last_name) => this.setState({last_name})}
                placeholder={this.state.last_name}
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(email_address) => this.setState({email_address})}
                placeholder={this.state.email_address}
                autoCapitalize={ 'none' }
              />
              <TouchableHighlight
                style={Styles.button}
                onPress={() => {
                  this.regModalClick(!this.state.regModalVisible)
                }}>
                  <Text style={Styles.buttonText} >Register</Text>
              </TouchableHighlight>

            </View>
           </View>
          </Modal>
        </View>
    );
  }
}

export default LoginModal;