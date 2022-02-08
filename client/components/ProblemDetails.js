import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";

const ProblemDetails = ({ navigation, route }) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("Need to get stronger");
  const [image, setImage] = useState(null);
  useEffect(async () => {
    console.log("getting image.....");
    const image = await fetch(
      "http://10.0.0.217:5000/image/4179faa643c43fa866aa66c786bbc433"
    );
    // setImage(image);
  }, []);
  return (
    <View>
      {!editMode && (
        <View style={styles.topContainer}>
          {/* Display Static Name/ Sent Status For Non-Edit Mode */}
          <Text style={styles.titleHeader}>
            {route.params.name}, V{route.params.grade}
          </Text>
          <Ionicons name="checkmark-circle" size={24} color="black" />
        </View>
      )}
      {/* Display Editable Name/ Sent Status */}
      {editMode && (
        <View style={styles.topContainer}>
          <TextInput
            style={styles.titleHeader}
            onChangeText={() => console.log("setName")}
            value={""}
            placeholder={route.params.name}
            placeholderTextColor="gray"
            keyboardType="default"
          />
          <Checkbox
            value={true}
            onValueChange={() => console.log("checked")}
            color="black"
          />
        </View>
      )}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{uri: "http://10.0.0.217:5000/image/4179faa643c43fa866aa66c786bbc433"}}
          ></Image>
        </View>
        <View style={styles.descriptionContainer}>
          {/* Show Static Description in View Mode*/}
          {!editMode && (
            <ScrollView>
              <Text>{description}</Text>
            </ScrollView>
          )}
          {/* Show Description Input in Edit Mode */}
          {editMode && (
            <TextInput
              style={{
                alignSelf: "flex-start",
              }}
              multiline
              onChangeText={() => "set new description"}
              value={""}
              placeholder={description}
              placeholderTextColor="white"
              keyboardType="default"
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          {/* Show "Edit" Button in View Mode */}
          {!editMode && (
            <Button
              title="Edit Problem"
              onPress={() => setEditMode(!editMode)}
              color="#DEB10A"
            />
          )}
          {/* Show "Save" Button in Edit Mode */}
          {editMode && (
            <Button
              title="Save Problem"
              onPress={() => console.log("save!")}
              color="#A6F3CA"
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    width: 300,
  },
  imageContainer: {
    height: 300,
    width: 325,
    borderRadius: 10,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.75,
    overflow: "hidden",
  },
  descriptionContainer: {
    width: 325,
    height: 150,
    borderRadius: 10,
    borderWidth: 0.75,
    overflow: "hidden",
    margin: 6,
    padding: 5,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 6,
    height: 35,
    width: 325,
  },
});

export default ProblemDetails;
