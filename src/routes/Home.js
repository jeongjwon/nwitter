import React, {useEffect, useState} from "react";
import { dbService } from "fbase";
import { collection, addDoc, query, onSnapshot, orderBy,serverTimestamp} from "@firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    console.log("user : ", userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot)=> {
        const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
        
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const docRef = await addDoc(collection(dbService, "nweets"), {
            text : nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
        });  
        console.log("document written with Id : ", docRef.id);
        
        setNweet("");
    };
   
    const onChange = (event) => {
        const { target:
            { value },
        } = event;
        setNweet(value);
    };
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="what's on your mind?"
                    maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))} 
            </div>
        </div>
    );
};
export default Home;
