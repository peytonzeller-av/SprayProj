import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
import { Snackbar, DefaultTheme } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const AddProblem = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(1);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    console.log(name, grade, description);
    if (name && grade && description && image) {
      setDisableSaveButton(false);
    }
  });

  // Static list of grades
  const grades = [
    { label: "V1", value: 1 },
    { label: "V2", value: 2 },
    { label: "V3", value: 3 },
    { label: "V4", value: 4 },
    { label: "V5", value: 5 },
    { label: "V6", value: 6 },
    { label: "V7", value: 7 },
    { label: "V8", value: 8 },
    { label: "V9", value: 9 },
    { label: "V10", value: 10 },
    { label: "V11", value: 11 },
    { label: "V12", value: 12 },
  ];

  // Choose Image
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // base64: true
      });

      if (!response?.cancelled && response?.uri) {
        console.log("URI", response?.uri);
        console.log("file", response);
        setImage(response?.uri);
      }
    }
  };

  // TODO - still working.. need to get the file path
  const saveProblem = async () => {
    const req = Object.assign(
      {},
      {
        name,
        description,
        grade,
        filePath: "",
      }
    );
    // TODO - Upload File first
    // const saveProblem = async () => {
    //   const data = await fetch("http://10.0.0.217:5000/create", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(req),
    //   }); // TODO - ENV specific
    //   console.log("saved");
    // };

    // // call the function
    // saveProblem();

    await fetch(
      "http://10.0.0.217:5000/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      } // TODO - ENV specific
    );
    setSuccessMessage(true);
    setTimeout(() => {
      navigation.navigate("Home", { refreshList: true });
    }, 5000);
  };
  return (
    <View style={styles.view}>
      {!successMessage && (
        <View style={styles.titleHeader}>
          <Text style={styles.titleText}>{"Create New Problem!"}</Text>
        </View>
      )}
      {successMessage && (
        <View style={styles.snackbarStyle}>
          <Snackbar
            visible={successMessage}
            onDismiss={() => console.log("")}
            theme={theme}
          >
            Problem Saved!
          </Snackbar>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
          placeholderTextColor="white"
          keyboardType="default"
        />
      </View>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={grade}
          onValueChange={setGrade}
          style={styles.input}
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
      <View>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            multiline
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
            placeholderTextColor="white"
            keyboardType="default"
          />
        </View>
        <TouchableOpacity
          onPress={openImageLibrary}
          style={styles.imageContainer}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtn}>Upload Image</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Problem"
          onPress={saveProblem}
          color="#D6ECEF"
          disabled={disableSaveButton}
        />
      </View>
    </View>
  );
};

const theme = Object.assign({}, DefaultTheme, {
  colors: {
    ...DefaultTheme.colors,
    onSurface: "#53c273",
  },
});

const styles = StyleSheet.create({
  input: {
    height: 35,
    width: 325,
    padding: 10,
  },
  inputContainer: {
    width: 325,
    borderRadius: 10,
    borderWidth: 0.75,
    overflow: "hidden",
    margin: 6,
    padding: 5,
    justifyContent: "center"
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
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
  titleHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  uploadBtn: {
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  imageContainer: {
    height: 300,
    width: 325,
    borderRadius: 10,
    margin: 6,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 0.75,
    overflow: "hidden",
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 6,
    height: 35,
    width: 325,
  },
  descriptionInput: { padding: 5 },
  snackbarStyle: {
    height: 50,
    width: 150,
  },
});

export default AddProblem;
