import React, {useEffect, useState} from "react";
import {dbService, storageService} from "fbase";
import {collection, addDoc, onSnapshot, serverTimestamp} from "@firebase/firestore";
import Nweet from "components/Nweet";
import {ref, uploadString, getDownloadURL} from "@firebase/storage";
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
    console.log("user : ", userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    useEffect(() => {
        onSnapshot(collection(dbService, "nweets"), (snapshot) => {
            const nweetArray = snapshot
                .docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            setNweets(nweetArray);
        });

    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await addDoc(collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment("");

    };

    const onChange = (event) => {
        const {target: {
                value
            }} = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        const {target: {
                files
            }} = event; //이벤트로 부터 파일을 읽어옴
        const theFile = files[0]; // 받아온 파일 중  첫 번째 파일만
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {
                    result
                }} = finishedEvent;
            setAttachment(result);
        } //파일 로딩이나 읽는 것을 끝나면
        reader.readAsDataURL(theFile);

    };

    const onClearAttachment = () => setAttachment("");
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="what's on your mind?"
                    maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/> {
                    attachment && (
                        <div>
                            <img src={attachment} width="50px" height="50px"/>
                            <button onClick={onClearAttachment}>Clear</button>
                        </div>
                    )
                }
            </form>
            <div>
                {
                    nweets.map((nweet) => (
                        <Nweet
                            key={nweet.id}
                            nweetObj={nweet}
                            isOwner={nweet.creatorId === userObj.uid}/>
                    ))
                }
            </div>
        </div>
    );
};
export default Home;
