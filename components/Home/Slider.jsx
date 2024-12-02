import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../../config/FirebaseConfig';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    try {
      setSliderList([]);
      const snapshot = await getDocs(collection(db, 'Sliders'));
      snapshot.forEach((doc)=>{
        console.log(doc.data());
        setSliderList(sliderList=>[...sliderList, doc.data()])
      })

      // const sliders = snapshot.docs.map((doc) => doc.data()); // Map to extract data from each document
      // console.log('Sliders:', sliders); // Log the sliders array for debugging
      // setSliderList(sliders); // Set the state directly with the array
    } catch (error) {
      console.error('Error fetching sliders:', error);
    }
  };
  

  return (
    <View style={{
        marginTop:15,
    }}>
      {sliderList.length === 0 ? (
        <Text style={styles.placeholderText}>No sliders available</Text>
      ) : (
        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
          data={sliderList}
          renderItem={({ item, index }) => (
            <View>
              <Image
                source={{ uri: item.ImageUrl }}
                style={styles?.sliderImage}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get('screen').width*0.9,
    height: 160,
    borderRadius:15,
    marginRight:15

  },
}); 