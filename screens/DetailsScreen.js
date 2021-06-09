import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config.js";
import { RFValue } from "react-native-responsive-fontsize";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      emailId: "",
      placeName: this.props.navigation.getParam("details")["nameOfPlace"],
      address: this.props.navigation.getParam("details")["address"],
      name: "",
      contact: "",
      address: "",
    };
  }

  getUserDetails = (userId) => {
    db.collection("registered_users")
      .where("user_Id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name,
            contact: doc.data().contact,
            address: doc.data().address,
            emailId: doc.data().user_Id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails(this.state.userId);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Status",
              style: {
                color: "#ffffff",
                fontSize: RFValue(25),
                fontWeight: "bold",
                marginTop: RFValue(-10),
              },
            }}
            backgroundColor="paleturquoise"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          {this.state.emailId == this.state.userId ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text></Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(23),
                  textAlign: "center",
                }}
              >
                {"Dear " +
                  this.state.name +
                  ", you have been registered at " +
                  this.state.placeName +
                  " for a 10 am slot. Please reach on time and show this message. ~Please carry an ID-Card~"}
              </Text>
              <View
                style={{
                  flex: 0.5,
                  alignItems: "center",
                  borderWidth: 5,
                  borderColor: "black",
                  marginTop: 50,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: RFValue(24),
                  }}
                >
                  Patient's Information
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(15),
                    alignSelf: "flex-start",
                  }}
                >
                  Name: {this.state.name}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(15),
                    alignSelf: "flex-start",
                  }}
                >
                  Contact: {this.state.contact}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(15),
                    alignSelf: "flex-start",
                  }}
                >
                  Address: {this.state.address}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.updateStatus();
                  alert("Registration is Done");
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: RFValue(20) }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text>Please register yourself</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "65%",
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(20),
    backgroundColor: "paleturquoise",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 20,
    marginTop: 250,
  },
});
