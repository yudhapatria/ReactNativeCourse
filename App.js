/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import { connect } from 'react-redux';
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceList from "./src/components/PlaceList/PlaceList";
import placeImage from './src/assets/beautiful-place.jpg';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

import {addPlace, deletePlace, selectPlace, deselectPlace} from './src/store/actions/index'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


 class App extends Component{
  placeAddedHandler = placeName => {
    this.props.onAddPlace(placeName);
  };
  placeSelectedHandler = key =>{
   this.props.onSelectedPlace(key);
  };

  placeDeletedHandler = () =>{
    this.props.onDeletePlace();
  };


    ModalClosedHandler = () =>{
     this.props.onDeselectPlace();
    }
  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail selectedPlace={this.props.selectedPlace} 
        onItemDeleted={this.placeDeletedHandler} 
        onModalClosed={this.ModalClosedHandler}/>
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList 
        places={this.props.places} 
        onItemSelected={this.placeSelectedHandler}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});

const mapStatetoToProps = state => {
  return{
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  };
};

const mapDispatchToProps = dispatch =>{
  return{
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: () => dispatch(deletePlace()),
    onSelectedPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  };
};
export default connect(mapStatetoToProps, mapDispatchToProps)(App);