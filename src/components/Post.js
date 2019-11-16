import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import DidLike from '../../resources/img/s2.png';
import DidNotLike from '../../resources/img/s2-checked.png';
import SendImage from '../../resources/img/icone.png';

const width = Dimensions.get('screen').width;

export default class Post extends Component {
  constructor(props){
    super(props)

    this.state = {
      foto: {...this.props.foto},
      novoComentario: "",
    }
  }

  lastTap = null;
  handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
      this.handleLike();
    } else {
      this.lastTap = now;
    }
  }

  handleLike(){
    const foto = {
      ...this.state.foto,
      likeada: !this.state.foto.likeada,
    }

    if(foto.likeada == false){
      foto.likers.push({login: "meuUsuario"})
    }else{
      foto.likers = foto.likers.filter(x => x.login !== "meuUsuario")
    }

    this.setState({
      foto
    })
  }

  handleComent(){
    let comentario = this.state.novoComentario
    
    if (comentario){
      let comentarios = this.state.foto.comentarios
      let novoId = comentarios.length
      comentarios.push({login: 'meuUsuario', texto: comentario, id: novoId})

      const foto = {
        ...this.state.foto,
        comentarios
      }

      this.setState({
        novoComentario: "",
        foto

      })
    }
  }

  showLikes(likers){
    if(likers != undefined){  
      return(
        likers.length > 0 &&
        <Text style={styles.n_likes}>
          {`${likers.length} ${likers.length > 1 ? 'curtidas': 'curtida'}`} 
        </Text>
      )
    }
    return ;
  }

  showSubtitle(foto){
    if(foto.comentario != undefined && foto.comentario.length > 0){
      return(
        <View style={styles.subtitle_container}>
          <Text style={styles.user_name}>{foto.loginUsuario}</Text>
          <Text style={styles.user_description}>{foto.comentario}</Text>
        </View>
      )
    }
  }

  showComents(comentarios){
    if(comentarios != undefined){
      return(
        <View>
          {comentarios.map(
            x =>
            <View style={[styles.subtitle_container, {marginLeft: 10}]} key={x.id}>
              <Text style={styles.user_name}>
                {x.login}
              </Text>
              <Text>
                {x.texto}
              </Text>
            </View>
          )}
        </View>
      )
    }
  }


  render() {
    const {foto} = this.state;

    return (
      <View>
        <View style={styles.cabecalho}>
          <Image source={{uri: foto.urlPerfil}}
              style={styles.fotoDePerfil}/>
          <Text>{foto.loginUsuario}</Text>
        </View>

        <TouchableWithoutFeedback onPress={() => this.handleDoubleTap()}>
          <Image source={{uri: foto.urlFoto}}
              style={styles.foto}/>
        </TouchableWithoutFeedback>

        <View style={styles.footer_post}>
          <TouchableOpacity style={{width: 40}} onPress={() => this.handleLike()}>
            <Image style={styles.like_post} source={this.state.foto.likeada ? DidLike: DidNotLike} />
          </TouchableOpacity>

          {this.showLikes(foto.likers)}
          {this.showSubtitle(foto)}
          {this.showComents(foto.comentarios)}

          <View style={styles.send_contrainer}>

            <TextInput style={styles.input_container} placeholder={'Comente aqui...'} 
            onSubmitEditing={() => this.handleComent()}
            onChangeText={(text) => this.setState({novoComentario:text})}
            value={this.state.novoComentario}
            />

            <TouchableOpacity style={styles.send_image_container} onPress={() => this.handleComent()}>
              <Image style={styles.send_image} source={SendImage} />
            </TouchableOpacity>
          </View>

        </View>
          
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoDePerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  foto: {
    width: width,
    height: width
  },
  footer_post:{
    padding: 10,
  },
  like_post: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  n_likes: {
    fontWeight:'bold',
    color: 'rgba(000,000,000,0.65)',
  },
  user_name: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  subtitle_container: {
    flexDirection: 'row',
  },

  send_contrainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_container: {
    flex: 4,
    marginTop: 10,
    borderColor: '#00000022',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    paddingLeft: 10,
    margin: 5,
  },
  send_image_container:{
    flex:1,
  },
  send_image: {
    width: 60,
    height: 60,
  },
});
