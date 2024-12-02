import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState} from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'
import { db } from '../../config/FirebaseConfig'
import PetListItem from './PetListItem'



export default function PetListByCategory() {

  const[petList, setPetList] = useState([]);
  const[loader,setLoader] = useState(false);

  useEffect(() => {
    GetPetList('Dogs');
  }, []); // Adaugă un array gol pentru a apela doar la montarea componentului

  // luam Lista de Animale in functie de categorie
  const GetPetList = async (category) => {
    setPetList([]); // Resetăm lista
    const q = query(collection(db, 'Pets'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      console.log('No pets found for category: ${category}');
      return;
    }
  

    querySnapshot.forEach((doc) => {
      setPetList(petList=>[...petList,doc.data()])
    });
    setLoader(false);
  };
  

  return (
    <View>
      <Category category={(value)=>GetPetList(value)}/>
        <FlatList
        style={{marginTop:10}}
        horizontal = {true}
        refreshing={loader}
        onRefresh={()=>GetPetList('Dogs')}
        data={petList}
        renderItem={({item, index})=>(
          <PetListItem pet={item}/>
        )}
        />
    </View>
  )
}