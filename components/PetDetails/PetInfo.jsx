import { View, Text } from 'react-native'
import React from 'react'

export default function PetInfo({pet}) {
  return (
    <View>
      <Image source={{uri:pet.ImageUrl}}
      style={{
        width:'100%',
        height:400,
        objectFit:'cover',
      }}
      />
    </View>
  )
}