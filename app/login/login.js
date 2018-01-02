import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  Modal,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import Styles from '../css/styles.js'
import constants from '../constants'

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loginModalVisible: !props.login,
        regModalVisible: false,
        username: 'username',
        password: 'password',
        first_name: 'first name',
        last_name: 'last name',
        email_address: 'email address',
        login_message: 'Please login to get Sentenced!',
        reg_message: 'Please complete all information so you can get Sentenced!',
    }
  }

  loginModalHide(visible) {
    this.setState({loginModalVisible: visible});
  }

  regModalShow(visible) {
    this.setState({regModalVisible: visible});
  }

  loginModalClick(visible) {
    fetch(constants.login, {
      headers: constants.headers,
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then( user => {
      let userInfo = JSON.parse(user._bodyText)
      if (!userInfo.message){
        AsyncStorage.setItem('login_token', userInfo.token)
        .then( token => {
          this.setState({ loginModalVisible: visible });
          this.props.loginCB({ username: this.state.username });
        })
      } else {
        this.setState({message: userInfo.message })
      }
    })
  }

  regModalClick(visible) {
    if (this.state.username === 'username' ||
        this.state.password === 'password' ||
        this.state.first_name === 'first name' ||
        this.state.last_name === 'last name' ||
        this.state.email_address === "email address"){
      this.setState({ reg_message: 'You left fields blank. Please correct and resubmit.'})
      this.forceUpdate();
      return;
    }

    let payload = { username: this.state.username,
                    password: this.state.password,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email_address,
                }

    fetch(constants.register, {
      headers: constants.headers,
      method: "POST",
      body: JSON.stringify(payload)
    })
    .then( user => {
      let userInfo = JSON.parse(user._bodyText);
      this.setState({regModalVisible: false});
      this.loginModalClick(false);
    })
  }

  render() {
    return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.loginModalVisible}
            >
           <View style={Styles.loginModal}>
            <View>
              <Text style= {Styles.title} >SENTENCED</Text>
              <Text style= {Styles.plainText} >{ this.state.message}</Text>
              <TextInput
                style={Styles.inputBox}
                onChangeText={(username) => this.setState({username})}
                placeholder={this.state.username}
                autoCapitalize={ 'none' }
                autoCorrect={false}
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(password) => this.setState({password})}
                placeholder={this.state.password}
                secureTextEntry={true}
                autoCapitalize={ 'none' }
                autoCorrect={false}
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
                  this.loginModalHide(!this.state.loginModalVisible)
                  this.regModalShow(!this.state.regModalVisible)
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
              <Text style= {Styles.plainText} >{ this.state.reg_message }</Text>
              <TextInput
                style={Styles.inputBox}
                onChangeText={(username) => this.setState({username})}
                placeholder={this.state.username}
                autoCapitalize={ 'none' }
                autoCorrect={false}
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(password) => this.setState({password})}
                placeholder={this.state.password}
                secureTextEntry={true}
                autoCapitalize={ 'none' }
                autoCorrect={false}
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(first_name) => this.setState({first_name})}
                placeholder={this.state.first_name}
                autoCorrect={false}
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(last_name) => this.setState({last_name})}
                placeholder={this.state.last_name}
                autoCorrect={false}
              />
              <TextInput
                style={Styles.inputBox}
                onChangeText={(email_address) => this.setState({email_address})}
                placeholder={this.state.email_address}
                autoCapitalize={ 'none' }
                autoCorrect={false}
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