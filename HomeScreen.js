import styles from ''

// TODO - Break out in to separate file
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="md-add-circle" size={32} />
      </View>
      <ProblemList />
    </View>
  );
};
