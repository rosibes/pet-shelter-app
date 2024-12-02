import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from '../../config/FirebaseConfig';
import Colors from './../../constants/Colors'

export default function Category({ category, selectedCategory }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    GetCategory();
  }, []); // Dependențele asigură că GetCategory este stabil.

  const GetCategory = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Category"));
      const categories = snapshot.docs.map(doc => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <View style={{ marginTop: 10 }}>

      <FlatList
        data={categoryList}
        numColumns={4}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              category(item.name);
            }}
            style={{ flex: 1 }}>
            <View
              style={[
                styles.container,
                selectedCategory === item.name && styles.selectedCategoryContainer,
              ]}>
              <Image
                source={{ uri: item?.ImageUrl }}
                style={[
                  { width: 40, height: 40 },
                  selectedCategory === item.name && styles.selectedImage, // Stilul imaginii selectate
                ]}
              />
            </View>
            <Text style={{ textAlign: 'center', fontFamily: 'PTMono' }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GOLDENROD,
    padding: 15,
    alignItems: 'center',
   //borderWidth: 1,
    borderRadius: 15,
   // borderColor: Colors.SALMON,
    margin: 3,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.VIOLET,
    borderColor: Colors.GOLDENROD,
  },
  selectedImage: {
    borderWidth: 3, // Grosimea bordurii
    borderColor: Colors.VIOLET, // Culoarea bordurii pentru imaginea selectată
    borderRadius: 20, // Dacă vrei un efect mai rotunjit
    padding: 5, // Optional, pentru a face bordura mai evidentă
  },
});
  