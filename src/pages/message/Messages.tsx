import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import { MessageBox, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import Navbar from "../../components/navbar/Navbar";
import "./messages.scss";
import { BASEURL } from "../../utils/constants";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Message = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAzIvyHjjRzCRRMAjS7xEKtxkNiZldc1Qk",
      authDomain: "mithuji-648ac.firebaseapp.com",
      projectId: "mithuji-648ac",
      storageBucket: "mithuji-648ac.appspot.com",
      messagingSenderId: "599150565445",
      appId: "1:599150565445:web:3fa312c44ae4c2727eeb2c",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const firestore = firebase.firestore();
  const chatsRef = firestore.collection("chat");
  const messageListsRef = firestore.collection("message_list");
  const query = chatsRef.orderBy("lastMessage.createdAt", "desc").limitToLast(25);
  const [Chats] = useCollectionData(query);

  const [seller, setSeller] = useState([
    { business_name: "", name: "", phone: "", seller_status: "", id: "" },
  ]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeChat, setActiveChat] = useState(null);

  const handleSend = () => {
    if (activeChat && inputValue.trim() !== "") {
      const messageListRef = messageListsRef.doc(activeChat.id);
  
      // Fetch the existing messages
      messageListRef.get().then((doc) => {
        if (doc.exists) {
          const existingMessages = doc.data().messages || [];
          const newMessage = {
            id: firebase.firestore().collection('messages').doc().id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            extension: "",
            text: inputValue,
            url: "",
            userID: "sender",
          };
  
          // Add the new message to the existing messages
          const updatedMessages = [...existingMessages, newMessage];
  
          // Update the Firestore document with the updated messages
          messageListRef.update({
            messages: updatedMessages,
          });
  
          // Update the last message in the chat
          chatsRef.doc(activeChat.id).update({
            lastMessage: newMessage,
          });
  
          setInputValue("");
        }
      });
    } else {
      createChat([{ name: "sender", id: "sender", profilePicture: "" }, {name: "sender", id: "sender", profilePicture: ""}]);
    }
  };  

  const createChat = async (participants) => {
    const chatDoc = await chatsRef.add({
      participants,
      lastMessage: null,
      isBlocked: false,
    });

    await messageListsRef.doc(chatDoc.id).set({ messages: [] });

    setActiveChat({
      id: chatDoc.id,
      participants,
      lastMessage: null,
      isBlocked: false,
    });
  };

  useEffect(() => {
    if (Chats && Chats.length > 0) {
      setActiveChat(Chats[0]);
    }
  }, [Chats]);

  useEffect(() => {
    getSeller();
  }, []);

  const getSeller = async () => {
    try {
      const response = await fetch(`${BASEURL}/admin/seller/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_auth_token")}`,
        },
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        setSeller(data.response.content);
      } else {
        alert(data.response);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    if (activeChat) {
      const messageListRef = messageListsRef.doc(activeChat.id);

      const unsubscribe = messageListRef
        .onSnapshot((snapshot) => {
          const data = snapshot.data();
          if (data) {
            setMessages(data.messages || []);
          }
        });

      return () => {
        unsubscribe();
      };
    }
  }, [activeChat]);

  const listItems = () => {
    return seller.map((d, i) => {
      return (
        <div
          key={i}
          onClick={() => handleClickChat(d)}
          className={`chat-item ${
            activeChat && activeChat.id === d.id ? "active" : ""
          }`}
        >
          <img
            className="dp"
            src={d.avatar || "default_avatar_url"}
            alt="Not Found"
          />
          <p className="sellerName">{d.name}</p>
        </div>
      );
    });
  };

  const handleClickChat = async (chatItem) => {
    setActiveChat(chatItem);

    const messageListRef = messageListsRef.doc(chatItem.id);
    const messageListSnapshot = await messageListRef.get();
    const chatMessages = messageListSnapshot.data()?.messages || [];
    setMessages(chatMessages);
  };

  return (
    <>
      <div className="message">
        <Navbar />
        <div className="innerAdd">
          <div className="leftBox">
            <div className="leftNav">
              {/* ... */}
            </div>
            <div className="chatItems">{listItems()}</div>
          </div>
          <div className="rightBox">
            <div className="addContainer">
              <div className="rightNav">
              </div>
              <div className="messageSection">
                <div className="messages">
                  {messages.map((message, i) => (
                    <MessageBox
                      className="messageBox"
                      key={i}
                      id={message.id}
                      type="text"
                      text={message.text}
                      position={message.userID === "sender" ? "right" : "left"}
                      date={message.createdAt.toDate()}
                      style={{
                        backgroundColor: message.userID === "sender" ? "orange" : "blue",
                        color: "white",
                      }}
                    />
                  ))}
                </div>
                <Input
                  className="inputMessage"
                  placeholder="Type a message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  maxHeight={100}
                  rightButtons={
                    <SendIcon className="sendIcon" onClick={handleSend} />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
