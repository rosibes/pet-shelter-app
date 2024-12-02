import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '../../config/FirebaseConfig';
import PetListItem from './PetListItem';

export default function PetListByCategory({ onSearch, selectedCategory }) {
  const [petList, setPetList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GetPetList(selectedCategory); // Căutăm pe baza categoriei selectate
  }, [selectedCategory]); // Se actualizează când categoria se schimbă

  const GetPetList = async (category = null, breed = null) => {
    setLoader(true);
    setPetList([]); // Resetăm lista

    let q;
    if (breed) {
      q = query(collection(db, 'Pets'), where('breed', '==', breed));
    } else if (category) {
      q = query(collection(db, 'Pets'), where('category', '==', category));
    } else {
      q = collection(db, 'Pets'); // Fetch all pets dacă nu avem filtre
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No pets found for the filter.`);
      setLoader(false);
      return;
    }

    querySnapshot.forEach((doc) => {
      setPetList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  // Expune funcția GetPetList către părinți
  useEffect(() => {
    if (onSearch) {
      onSearch((breed) => GetPetList(null, breed));
    }
  }, [onSearch]);

  return (
    <View>
      <Category category={(value) => GetPetList(value)} selectedCategory={selectedCategory} />
      <FlatList
        style={{ marginTop: 10 }}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetPetList('Dogs')}
        data={petList}
        renderItem={({ item }) => <PetListItem pet={item} />}
      />
    </View>
  );
}
