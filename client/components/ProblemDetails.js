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

// TODO - Break out in to separate file
const ProblemDetails = ({ navigation, route }) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("Need to get stronger");
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {/* Display Static Name/ Sent Status For Non-Edit Mode */}
        {!editMode && (
          <Text style={styles.titleHeader}>
            {route.params.name}, V{route.params.grade}
          </Text>
        )}
        {!editMode && (
          <Ionicons name="checkmark-circle" size={24} color="black" />
        )}
        {/* Display Editable Name/ Editable Sent Status for Edit Mode */}
        {editMode && (
          <TextInput
            style={styles.titleHeader}
            onChangeText={() => console.log("setName")}
            value={""}
            placeholder={route.params.name}
            placeholderTextColor="gray"
            keyboardType="default"
          />
        )}
        {editMode && (
          <Checkbox
            value={true}
            onValueChange={() => console.log("checked")}
            color="black"
          />
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={{
              // TODO - GET
              uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FSprayProj-59b0df3d-9662-4aae-93a9-ce43836b8b20/ImagePicker/2036e27a-2d91-4d21-8d0e-774f5407c6fd.jpg",
            }}
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
  view: {
    justifyContent: "center",
    alignItems: "center",
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
