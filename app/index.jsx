import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, useRootNavigationState, userRootNavigationState, userRouter} from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {

  const {user}=useUser();



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

    {/*  <Link href={'/login'}>
        <Text> Go to login screen </Text>
      </Link> */}

     {/* daca useru e deja conectat il redirectionaza catre /home, 
    iar daca nu, il rediretioneaza catre login screen. (?:) */}
     {user?<Redirect href={'/(tabs)/home'}/>:<Redirect href={'/login'}/>}
    </View>
  );
}
