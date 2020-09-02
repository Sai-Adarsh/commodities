import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {
        'change': '',
        'changepercentage': '',
        'price': '',
        'commodity': '',
      },
      country: 'gold',
    };
  }

  componentDidMount(value) {
    fetch("http://investingdotcom.herokuapp.com/" + value, {
      method: "POST",
      headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
      }
    })
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
                console.log(this.state.dataSource)
            })
            .catch(error => console.log(error))
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 100, fontWeight: 'bold'}}>💰</Text>
        <Text>{"\n"}</Text>
        <DropDownPicker
            items={[
                {label: 'Crude Oil', value: 'crude-oil', icon: () => <Icon name="zap" size={25} color="#32a852" />},
                {label: 'Brent Oil', value: 'brent-oil', icon: () => <Icon name="zap" size={25} color="#32a852" />},
                {label: 'Natural Gas', value: 'natural-gas', icon: () => <Icon name="zap" size={25} color="#32a852" />},
                {label: 'Gold', value: 'gold', icon: () => <Icon name="zap" size={25} color="#32a852" />},
                {label: 'Silver', value: 'silver', icon: () => <Icon name="zap" size={25} color="#32a852" />},
                {label: 'Copper', value: 'copper', icon: () => <Icon name="zap" size={25} color="#32a852" />},
                {label: 'US Soybeans', value: 'us-soybeans', icon: () => <Icon name="zap" size={25} color="#32a852" />},
            ]}
            defaultValue={this.state.country}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa', width: 200}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa',width: 200}}
            onChangeItem={(item) => {
                this.setState({country: item.value});
                this.componentDidMount(item.value);
              }
            }
        />
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>{'\n'}{this.state.dataSource.commodity}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', left: -20}}>{this.state.dataSource.price}</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: this.state.dataSource.change.includes("+") ? "#1adb34" : "#db1a67"}}>{this.state.dataSource.change}</Text>
          <Text style={{fontSize: 25, fontWeight: 'bold', right: -20, color: this.state.dataSource.changepercentage.includes("+") ? "#1adb34" : "#db1a67"}}>{this.state.dataSource.changepercentage}</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
