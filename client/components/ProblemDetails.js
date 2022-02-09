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
import { Picker } from "@react-native-picker/picker";
import { grades } from "../constants";

const ProblemDetails = ({ navigation, route }) => {
  const [editMode, setEditMode] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState(route.params?.problem.grade);
  const [newSentValue, setNewSentValue] = useState(route.params.problem?.sent);
  const [imageKey, setImageKey] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);

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
          grade: newGrade,
          description: newDescription
            ? newDescription
            : route.params.problem?.description,
          filePath: route.params?.problem?.filePath,
          sent: newSentValue,
        },
      }
    );
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

  handleDelete = async () => {
    try {
      console.log("Deleting problem....", route.params.problem._id);
      // Delete Problem in MongoDB
      await fetch("http://10.0.0.217:5000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: route.params.problem?._id }),
      });
      // Delete image in s3
      await fetch(
        `http://10.0.0.217:5000/delete-image/${route.params.problem?.filePath}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        navigation.navigate("Home", { refreshList: true });
      }, 2000);
    } catch (e) {
      console.log("error deleting problem", e);
    }
  };

  return (
    <View>
      {/* Success Snackbar */}
      {successMessage && (
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <View style={styles.snackbarStyle}>
            <Snackbar visible={successMessage} theme={theme}>
              Problem Saved!
            </Snackbar>
          </View>
        </View>
      )}
      {/* Delete Snackbar */}
      {deleteMessage && (
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <View style={styles.deleteSnackbarStyle}>
            <Snackbar
              theme={deleteTheme}
              visible={deleteMessage}
              action={{
                label: "Yes",
                onPress: () => handleDelete(),
              }}
              onDismiss={() => setDeleteMessage(false)}
            >
              Are you sure?
            </Snackbar>
          </View>
        </View>
      )}
      {!editMode && (
        <View style={styles.topContainer}>
          {/* Display Static Name/ Sent Status For Non-Edit Mode */}
          <Text style={editMode ? styles.editTitleHeader : styles.titleHeader}>
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
            style={styles.editTitleHeader}
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
      {editMode && (
        <View style={styles.topContainer}>
          <Picker
            style={styles.input}
            selectedValue={newGrade}
            onValueChange={setNewGrade}
          >
            {grades.map((grade, idx) => (
              <Picker.Item
                label={grade.label}
                value={grade.value}
                key={`${grade}-${idx}`}
              />
            ))}
          </Picker>
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
          {!imageKey && <Text style={styles.uploadBtn}>Loading Image...</Text>}
        </View>
        <View
          style={
            editMode
              ? styles.editDescriptionContainer
              : styles.descriptionContainer
          }
        >
          {/* Show Static Description in View Mode*/}
          {!editMode && (
            <ScrollView>
              <Text>{route.params.problem?.description || "Description"}</Text>
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
              placeholder={route.params.problem?.description || "Description"}
              placeholderTextColor="white"
              keyboardType="default"
            />
          )}
        </View>
        <View
          style={
            !editMode ? styles.buttonContainer : styles.editModeButtonContainer
          }
        >
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
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <Button
                title="Delete Problem"
                onPress={() => {
                  console.log("setDeleteMessage");
                  setDeleteMessage(true);
                }}
                color="#DA8C8C"
              />
              <Button
                title="Save Problem"
                onPress={handleSave}
                color="#A6F3CA"
              />
            </View>
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
    width: 325,
  },
  editTitleHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    width: 300,
  },
  imageContainer: {
    height: 415,
    width: 375,
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
    width: 375,
    height: 75,
    borderRadius: 10,
    borderWidth: 0.75,
    overflow: "hidden",
    margin: 6,
    padding: 5,
  },
  editDescriptionContainer: {
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
    width: 375,
  },
  editModeButtonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 6,
    padding: 5,
    height: 85,
    width: 325,
  },
  snackbarStyle: {
    height: 50,
    width: 150,
  },
  deleteSnackbarStyle: {
    height: 50,
    width: 250,
  },
  uploadBtn: {
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  input: {
    height: 35,
    width: 325,
    marginLeft: 10,
  },
});

// Make snackbar success message green
const theme = Object.assign({}, DefaultTheme, {
  colors: {
    ...DefaultTheme.colors,
    onSurface: "#53c273",
  },
});

const deleteTheme = Object.assign({}, DefaultTheme, {
  colors: {
    ...DefaultTheme.colors,
    onSurface: "#B074F7",
  },
});

export default ProblemDetails;
