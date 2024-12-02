import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';


export default function TabLayout() {
  return (
    
    <Tabs
      screenOptions={{              //coloreaza atat textul cat si iconul
        tabBarActiveTintColor:Colors.SALMON
      }}
    >
        <Tabs.Screen name='home'
          options={{
            title:'Home',
            HeaderShown:false,
            tabBarIcon:({color})=><FontAwesome5 name="home" size={24} color={color} />
          }}
          />
        <Tabs.Screen name='favorite'
          options={{
            title:'Favorite',
            HeaderShown:false,
            tabBarIcon:({color})=><AntDesign name="heart" size={24} color={color}/>
          }}
          />
        <Tabs.Screen name='inbox'
        options={{ 
          title:'Inbox',
          HeaderShown:false,
          tabBarIcon:({color})=><Entypo name="chat" size={24} color={color} />
        }}
        />
        <Tabs.Screen name='profile'
        options={{
          title:'Profile',
          HeaderShown:false,
          tabBarIcon:({color})=><MaterialIcons name="people-alt" size={24} color={color} />
        }}
        />
    </Tabs>
  )
}