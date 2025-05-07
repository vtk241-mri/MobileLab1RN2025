import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("./assets/logo.svg")}
        style={styles.logo}
        resizeMode="cover"
      />
      <Text style={styles.title}>FirstMobileApp</Text>
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Мосійчук Ростислав Іванович, ВТк-24-1
      </Text>
    </View>
  );
}

function NewsScreen() {
  const data = Array.from({ length: 8 }).map((_, i) => ({
    id: i.toString(),
    title: `Заголовок новини ${i + 1}`,
    date: "Дата новини",
    snippet: "Короткий текст новини...",
  }));

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <View style={styles.thumbPlaceholder} />
      <View style={{ flex: 1 }}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{item.date}</Text>
        <Text style={styles.newsSnippet}>{item.snippet}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

function GalleryScreen() {
  const photos = Array.from({ length: 12 }).map((_, i) => ({
    id: i.toString(),
  }));

  const renderPhoto = ({ item }) => <View style={styles.photoItem}></View>;

  return (
    <FlatList
      data={photos}
      renderItem={renderPhoto}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={{ padding: 8 }}
    />
  );
}

function ProfileScreen() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [pass2, setPass2] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [name, setName] = React.useState("");

  return (
    <ScrollView contentContainerStyle={styles.formContainer}>
      <Text>Електронна пошта</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text>Пароль</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <Text>Пароль (ще раз)</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={pass2}
        onChangeText={setPass2}
      />

      <Text>Прізвище</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />

      <Text>Ім'я</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Button title="Зареєструватися" onPress={() => {}} />
    </ScrollView>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName =
                route.name === "Головна"
                  ? "home-outline"
                  : route.name === "Фотогалерея"
                  ? "images-outline"
                  : "person-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Головна" component={NewsScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff412",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#125123",
  },
  logo: { width: 120, height: 36, marginRight: 8 },
  title: { fontSize: 18, fontWeight: "600" },

  footer: {
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  footerText: { fontSize: 12, color: "#555" },

  newsItem: { flexDirection: "row", marginBottom: 16 },
  thumbPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: "#eee",
    marginRight: 12,
    borderRadius: 4,
  },
  newsTitle: { fontWeight: "bold" },
  newsDate: { fontSize: 12, color: "#555" },
  newsSnippet: { fontSize: 14, color: "#333" },

  photoItem: {
    flex: 1 / 2,
    aspectRatio: 1,
    margin: 6,
    backgroundColor: "#eee",
    borderRadius: 4,
    boxShadowColor: "#000",
    boxShadowOffset: { width: 3, height: 2 },
    boxShadowOpacity: 1,
    boxShadowRadius: 2,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  formContainer: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});
