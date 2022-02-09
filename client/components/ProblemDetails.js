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
import { Snackbar, DefaultTheme } from "react-native-paper";

const ProblemDetails = ({ navigation, route }) => {
  const [editMode, setEditMode] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newName, setNewName] = useState("");
  const [newSentValue, setNewSentValue] = useState(route.params.problem?.sent);
  const [imageKey, setImageKey] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  // Get Problem Image
  useEffect(async () => {
    try {
      console.log("getting image key for problem...");
      const imageURL = `http://10.0.0.217:5000/image/${route.params.problem?.filePath}`;
      const image = await fetch(imageURL, {
        method: "GET",
      });
      setImageKey(imageURL);
    } catch (e) {
      console.log("error retrieving image for problem ", e);
    }
  }, []);

  const handleSave = async () => {
    const req = Object.assign(
      {},
      {
        key: route.params.problem?._id,
        problem: {
          name: newName ? newName : route.params.problem?.name,
          grade: route.params.problem?.grade,
          description: newDescription
            ? newDescription
            : route.params.problem?.description,
          filePath: route.params?.problem?.filePath,
          sent: newSentValue,
        },
      }
    );
    console.log("reques...", req);
    await fetch("http://10.0.0.217:5000/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    setSuccessMessage(true);
    setTimeout(() => {
      navigation.navigate("Home", { refreshList: true });
    }, 2000);
  };
  return (
    <View>
      {successMessage && (
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <View style={styles.snackbarStyle}>
            <Snackbar visible={successMessage} theme={theme}>
              Problem Saved!
            </Snackbar>
          </View>
        </View>
      )}
      {!editMode && (
        <View style={styles.topContainer}>
          {/* Display Static Name/ Sent Status For Non-Edit Mode */}
          <Text style={styles.titleHeader}>
            {route.params.problem?.name}, V{route.params.problem?.grade}
          </Text>
          {route.params.problem.sent && (
            <Ionicons name="checkmark-circle" size={24} color="black" />
          )}
          {!route.params.problem.sent && (
            <Ionicons name="md-square-outline" size={24} color="black" />
          )}
        </View>
      )}
      {/* Display Editable Name/ Sent Status */}
      {editMode && (
        <View style={styles.topContainer}>
          <TextInput
            style={styles.titleHeader}
            onChangeText={setNewName}
            value={newName}
            placeholder={route.params.problem?.name}
            placeholderTextColor="gray"
            keyboardType="default"
          />
          <Checkbox
            value={newSentValue}
            onValueChange={setNewSentValue}
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
        <View
          style={editMode ? styles.editImageContainer : styles.imageContainer}
        >
          {imageKey && (
            <Image
              style={{ height: "100%", width: "100%" }}
              source={{
                uri: imageKey,
              }}
            ></Image>
          )}
        </View>
        <View style={styles.descriptionContainer}>
          {/* Show Static Description in View Mode*/}
          {!editMode && (
            <ScrollView>
              <Text>{route.params.problem?.description}</Text>
            </ScrollView>
          )}
          {/* Show Description Input in Edit Mode */}
          {editMode && (
            <TextInput
              style={{
                alignSelf: "flex-start",
              }}
              multiline
              onChangeText={setNewDescription}
              value={newDescription}
              placeholder={route.params.problem?.description}
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
            <Button title="Save Problem" onPress={handleSave} color="#A6F3CA" />
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
    height: 500,
    width: 325,
    borderRadius: 10,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.75,
    overflow: "hidden",
  },
  editImageContainer: {
    height: 250,
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
  snackbarStyle: {
    height: 50,
    width: 150,
  },
});

// Make snackbar success message green
const theme = Object.assign({}, DefaultTheme, {
  colors: {
    ...DefaultTheme.colors,
    onSurface: "#53c273",
  },
});

export default ProblemDetails;
