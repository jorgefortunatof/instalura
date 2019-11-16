import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Post from './components/Post';


export default class InstaluraMobile extends Component {

  constructor() {
    super();
    this.state = {
      fotos: [{}]
    }
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(resposta => resposta.json())
      .then(json => this.setState({fotos: json}))
  }

  render() {
    return (
      <SafeAreaView>  
        <FlatList
            keyExtractor={item => String(item.id)}
            data={this.state.fotos}
            renderItem={ ({item}) =>
              <Post foto={item}/>
            }
        />
      </SafeAreaView>
    );
  }
}
