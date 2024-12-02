import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
    const { user } = useUser();
  
    return (
      <View style={styles.container}>
        {/* Header cu nume și avatar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.userName}>{user?.fullName}</Text>
          </View>
          <Image
            source={{ uri: user?.imageUrl }}
            style={styles.avatar}
          />
        </View>
  
        {/* Buton de Search */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for pets"
            placeholderTextColor='black'
            style={styles.searchInput}
          />
          <Pressable style={styles.searchButton}>
            <FontAwesome name="search" size={16} color="white" />
          </Pressable>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginBottom:10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    welcomeText: {
      fontFamily: 'euclid_reg',
      fontSize: 18,
    },
    userName: {
      fontFamily: 'euclid_medium',
      fontSize: 25,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
     color:Colors.VIOLET,
     // borderRadius: 10,
      overflow: 'hidden',
    },
    searchInput: {
      borderRadius:10,
      flex: 1,
      padding: 10,
      paddingHorizontal: 15,
      fontFamily: 'euclid_reg',
      fontSize: 16,
      color: Colors.BLACK,
      
      backgroundColor: 'white', // Aliniat cu fundalul containerului
      borderWidth:1,
      borderColor:Colors.ALBASTRU,
    },
    searchButton: {
      borderRadius:10,
      padding: 12.3,
      backgroundColor: Colors.VIOLET,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });