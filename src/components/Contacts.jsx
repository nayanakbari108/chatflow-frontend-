import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [search, setSearch] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  // Check if string is empty or contains whitespaces
  const isEmptyOrSpaces = (str) => {
    return /^\s*$/.test(str);
  };

  // Search Contacts Logic
  useEffect(() => {
      const re = RegExp(
        `.*${search.toLowerCase().replace(/\s+/g, "").split("").join(".*")}.*`
      );
      const searchResults = contacts.filter((v) =>
        v.username.toLowerCase().match(re)
      );
  
      setFilteredContacts(searchResults);
  }, [search]);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  //extra
  const showContacts = (contact, index) =>{
    return (
      <div
        key={contact._id}
        className={`contact ${
          index === currentSelected ? "selected" : ""
        }`}
        onClick={() => changeCurrentChat(index, contact)}
      >
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
            alt=""
          />
        </div>
        <div className="username">
          <h3>{contact.username}</h3>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ChatFlow</h3>
          </div>
          <div className="contacts">
          <div className="contacts-search">
              <input
                type="text"
                placeholder="Search Contacts"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Show Searched Contacts */}
            {isEmptyOrSpaces(search) ? (
              contacts.map((contact, i) => showContacts(contact, i))
            ) : filteredContacts.length > 0 ? (
              filteredContacts.map((contact, i) => showContacts(contact, i))
            ) : (
              <p>No Contacts Found.</p>
            )}
            {contacts.map((contact, index) => {
              // return (
              //   <div
              //     key={contact._id}
              //     className={`contact ${
              //       index === currentSelected ? "selected" : ""
              //     }`}
              //     onClick={() => changeCurrentChat(index, contact)}
              //   >
              //     <div className="avatar">
              //       <img
              //         src={`data:image/svg+xml;base64,${contact.avatarImage}`}
              //         alt=""
              //       />
              //     </div>
              //     <div className="username">
              //       <h3>{contact.username}</h3>
              //     </div>
              //   </div>
              // );
            })
            }
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;
  background-color: #080420;
  border-top-left-radius:2rem;
  border-bottom-left-radius:2rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overflow-x:hidden;
    gap: 0.8rem;
    &::-webkit-scrollbar{
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    p{
    color:white;
    }
    .contacts-search {
      width: 90%;
      height: 2.5rem;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      gap: 2rem;
      background-color: rgba(255, 255, 255, 0.204);

      input {
        background-color: transparent;
        color: #fff;
        border: none;
        padding-top:0.5rem;
        padding-bottom:0.5rem;
        padding-left: 1rem;
        font-size: 1.2rem;

        &::selection {
          background-color: #9a86f3;
        }

        &:focus {
          outline: none;
        }
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 4.5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    .avatar {
      img {
        height: 3.5rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
