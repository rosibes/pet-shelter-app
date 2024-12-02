import { doc, getDoc, setDoc } from "firebase/firestore/lite"
import {db} from '@/config/FirebaseConfig'
export const GetFavList=async(user)=>{
    const docSnap = await getDoc(doc(db, 'UserFavPet', user?.primaryEmailAdress?.emailAdress));
    if(docSnap?.exists()){
        return docSnap.data();
    }
    else{
        await setDoc(doc(db,'userFavPet', user?.primaryEmailAdress.emailAdress),{
            email:usesr?.primaryEmailAdress?.emailAdress,
            favorites:[]
        })
    }
}