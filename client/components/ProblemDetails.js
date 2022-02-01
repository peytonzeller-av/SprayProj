import { View, Text, StyleSheet, Image } from "react-native";

// TODO - Break out in to separate file
const ProblemDetails = ({ navigation, route }) => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.titleHeader}>
        {route.params.name}, V{route.params.grade}
      </Text>
      <View style={styles.imageContainer}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{
            // TODO - GET
            uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FSprayProj-59b0df3d-9662-4aae-93a9-ce43836b8b20/ImagePicker/c0f2c280-e99d-44b4-852e-f64141e1eef7.jpg",
          }}
        ></Image>
      </View>
      <View style={styles.descriptionContainer}>
        <Text>
          'm not the classic profile of what the ladies want You might think I'm
          depressed as can be But when I look in the mirror I see sexy-ass me
          And if that's somethin that you can't respect then that's peace My
          life's better without you, actually To everyone out there, who's a
          little different I say damn a magazine, these is God's fingerprints
          You can call me ugly but can't take nothing from me I am what I am,
          doctor, you ain't gotta love me If you would please turn in your Bible
          To beauty tips according to Forest Whitaker In the third chapter of
          the third line Brother Ali, would you please read to the choir for me,
          son I'ma be all right You ain't gotta be my friend tonight (you ain't
          gotta love me)
        </Text>
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
});

export default ProblemDetails;
