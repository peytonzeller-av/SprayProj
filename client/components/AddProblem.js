import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Button,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const AddProblem = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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
        setImage(response?.uri);
      }
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.titleHeader}>
        <Text style={styles.titleText}>{"Create New Problem!"}</Text>
      </View>
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
          selectedValue={""}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
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
      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
          placeholderTextColor="white"
          keyboardType="default"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Problem"
          onPress={() => console.log("save")} // TODO!
          color="#D6ECEF"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 35,
    width: 325,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 325,
    borderRadius: 10,
    borderWidth: 0.75,
    overflow: "hidden",
    margin: 6,
    padding: 5,
  },
  view: {
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    flexDirection: "row",
    justifyContent: "center",
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
});

export default AddProblem;
