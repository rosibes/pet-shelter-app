import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import PetListByCategory from '../../components/Home/PetListByCategory'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '@/constants/Colors'
import Slider from '../../components/Home/Slider';

export default function Home() {
  return (
    <View style={{
      padding:20,marginTop:10
    }}>
      {/*HEADER*/}
      <Header/>
      {/*SLIDER*/}
      <Slider/>
      {/* PetList + CATEROGRY*/}
      <PetListByCategory/> 

      {/* ADD NEW PET OPTION*/}
      <TouchableOpacity style={styles.addNewPetContainer}>
      <AntDesign name="pluscircle" size={24} color={Colors.BROWN} />
      <Text style={{
        fontFamily:'robonto_bold',
        textAlign:'center',
        color:Colors.BROWN,
        fontSize:17
      }}>Add New Pet</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    padding:20,
    marginTop:10,
    backgroundColor:Colors.GOLDENROD,
    borderWidth:1,
    borderRadius:10,
    borderColor:Colors.BROWN,
    borderStyle:'dashed',
    justifyContent:'center'
  }
})