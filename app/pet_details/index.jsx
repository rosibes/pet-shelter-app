import { View, Text,ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
//import PetInfo from '../../components/Home/PetDetails/PetInfo';
//import PetSubInfo from '../../components/Home/PetDetails/PetSubInfo';
//import AboutPet from '../../components/Home/PetDetails/AboutPet';
//import OwnerInfo from '../../components/Home/PetDetails/OwnerInfo';
import Colors from '@/constants/Colors';

export default function PetDetails() {
    const pet = useLocalSearchParams();  //we get the infos
    const navigation = useNavigation();

        //scoate headerul
    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,     //il facem transparent
            headerTitle:''      //il inlocuim cu nimic
        })
    },[])
  return (
    <View>
        <ScrollView>            
    {/*Pet Info*/}
        <PetInfo pet={pet}/>
    {/*Pet Properties*/}
        <PetSubInfo pet={pet}/>
    {/*About*/}
        <AboutPet pet={pet}/>
    {/*Owner Details*/}
        <OwnerInfo pet={pet}/>
        <View style={{height:70}}>

        </View>
        </ScrollView>
    {/*Adopt me Button*/}
    <View style={styles?.bottomContainer}>
            <TouchableOpacity style={styles?.adoptBtn}>
                <Text style={{
                    fontFamily:'PTMono',
                    textAlign:'center',
                    fontSize:20,
                    color:'white'
                }}>Adopt Me</Text>
            </TouchableOpacity>   
        </View>
    {/*Location*/}
    </View>
  )
}

const styles = StyleSheet.create({
    adoptBtn:{
        padding:15,
        backgroundColor:Colors.SALMON,
    },

    //ca sa apara mereu jos, (trebuia sa fie in <ScrollView> ca sa se fi vazut )
    bottomContainer:{
        position:'absolute',
        width:'100%',
        bottom:0
    },

})