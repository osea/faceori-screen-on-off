import React, { Component } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import {Video} from 'expo-av';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
const io = require('socket.io-client');
import { StatusBar } from 'react-native';

const SocketEndpoint = 'http://192.168.0.11:5000/test';

export default class BlinkApp extends Component {
  
  state = {
    isConnected: false,
		mute: false,
		fullScreen: false,
		shouldPlay: true,
    data: null
	}

  componentDidMount() {
    StatusBar.setHidden(true);
    const socket = io(SocketEndpoint, {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('result', data => {
      console.log(data.distance)
      this.setState({data:data.distance});
    });
  }

  //state object
  state = { isShowingText: true };

  render() {
    
		const { width, height } = Dimensions.get('window');

    if(this.state.data > 9)
    {
      return (
        <View style={styles.container}>
          <View>
              <Video
                source={{ uri: 'https://osea.github.io/faceori.github.io/unlock.mov' }}
                shouldPlay
                resizeMode={Video.RESIZE_MODE_COVER}
                style={{ width, height}}
                isMuted={this.state.mute}
              />
            </View>
        </View>
      );
    }
    else{
      return (
        <View style={styles.container}>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
	},
	
});