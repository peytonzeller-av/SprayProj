import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// TODO - Break out in to separate file
const ProblemDetails = ({ navigation, route }) => {
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.titleHeader}>
          {route.params.name}, V{route.params.grade}
        </Text>
        <Ionicons name="checkmark-circle" size={24} color="black" />
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
          <ScrollView>
            <Text>
              I need stronger fingers cause I'm a weak little bich. Made it to
              the second move
            </Text>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Edit Problem"
            onPress={() => console.log("save")} // TODO!
            color="#DEB10A"
          />
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
  buttonContainer: {
    borderRadius: 10,
    overflow: "hidden",
    margin: 6,
    height: 35,
    width: 325,
  },
});

export default ProblemDetails;
