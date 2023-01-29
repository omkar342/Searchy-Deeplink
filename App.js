import { StatusBar } from "expo-status-bar";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";

export default function App() {
  const handleEventListeners = (event) => {
    console.log("started3");
    console.log(event, "event");
    let data = Linking.parse(event.url);
    setData(data);
    console.log(data, "data");
  };

  const [data, setData] = useState();

  useEffect(() => {
    async function getInitialURL() {
      // getInitialURL gets the URL that was used to launch the app if it was launched by a link.
      // getInitialURL will be called only if the app is opened from a deeplink,
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        console.log(initialURL, "initialURL");
        setData(Linking.parse(initialURL));
      }
    }

    console.log("started1");
    // handleEventListeners will be called only if the app is opened from a deeplink,
    // the only event link will be created.
    const listener = Linking.addEventListener("url", handleEventListeners);
    if (!data) {
      console.log("No data");
      getInitialURL();
    }
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <View style={styles.container}>
        <Text style={{ flex: 1 }}>2Finally Welcome To My App!</Text>
        <Text style={{ flex: 1 }}>2Finally Welcome To My App!</Text>
        <Text style={{ flex: 1 }}>
          {data ? JSON.stringify(data) : "App not opened from deeplink"}
        </Text>
        <Button
          style={{
            flex: 1,
          }}
          color="red"
          title="Mail To"
          onPress={() => {
            Linking.openURL("mailto:omkarjadhav095@gmail.com");
          }}
        />
        <Text style={{ flex: 1 }}>2Finally Welcome To My App!</Text>

        <StatusBar backgroundColor="black" style="light" hidden={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
