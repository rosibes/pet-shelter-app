import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

const screenWidth = Dimensions.get('window').width; // Lățimea ecranului
const cardWidth = (screenWidth - 80) / 2; // Două elemente per rând cu spațiu între ele

export default function PetListItem({pet}) {
  const router = useRouter();
  return (
    <TouchableOpacity 
    onPress={()=>router.push({
      pathname:'/pet_details',
      params:pet
    })}
    style={[styles.itemContainer, { width: cardWidth }]}>
      {/* Secțiunea imaginii */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pet?.ImageUrl || 'https://via.placeholder.com/170x140' }}
          style={styles.image}
        />
      </View>

      {/* Secțiunea textului */}
      <View style={styles.textContainer}>
        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          //alignItems:'center'
        }}>
        <Text style={styles.nameText}>{pet?.name || 'Unknown Name'}</Text>
        <Text style={styles.breedText}>{'(' + (pet.breed || 'Unknown Breed') + ')'}</Text>
        </View>
        <View style={{
          backgroundColor:Colors.VIOLET,
          borderRadius:12,
          alignContent:'center'
        }}>
        <Text style={styles.detailsText}>{pet.sex + ', ' + pet.age} yrs.</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10, // Spațiu între elemente
    backgroundColor: Colors.SALMON,
  },
  imageContainer: {
    backgroundColor: Colors.SALMON,
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Taie imaginea astfel încât să acopere complet zona
  },
  textContainer: {
    padding: 7,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  nameText: {
    color: Colors.BROWN,
    fontFamily: 'robonto_bold',
    fontSize: 18,
    marginBottom: 5,
  },
  breedText: {
    color: Colors.SALMON,
    fontFamily: 'robonto_medium',
    fontSize: 12,
    marginTop:3
  },
  detailsText: {
    color: Colors.ALBASTRU,
    fontFamily: 'robonto_medium',
    fontSize: 12,
    marginTop: 5,
  },
});