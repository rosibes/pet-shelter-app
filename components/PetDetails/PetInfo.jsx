import { View, Text, Image } from 'react-native';
import React from 'react';
import MarkFav from '../MarkFav';
import Colors from '@/constants/Colors';

export default function PetInfo({ pet }) {
  return (
    <View>
      <Image
        source={{ uri: pet.ImageUrl }}
        style={{
          width: '100%',
          height: 400,
          resizeMode: 'cover', // Correct property instead of 'objectFit'
        }}
      />
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: 'euclid_bold',
              fontSize: 27,
            }}
          >
            {pet?.name}
          </Text>

          <Text
            style={{
              fontFamily: 'euclid_reg',
              fontSize: 16,
              color: Colors.VIOLET,
            }}
          >
            {pet?.adress}
          </Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
}
