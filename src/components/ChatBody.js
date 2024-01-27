import React, { useState, useEffect } from "react";
import Cards from "./Cards";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import AddCard from "./AddCard";
import { useSearch } from "../context/SearchContext";

const ChatBody = () => {
  const { searchTerm, searchFriends } = useSearch();
  const { user } = useAuth();
  const [userFriends, setUserFriends] = useState([]);
  console.log("user friendssssss", userFriends);

  useEffect(() => {
    console.log("user friends", userFriends);
  }, [userFriends]);

  useEffect(() => {
    // setDetails(data)
    // console.log('details,',details)
    console.log("user chatbody", user);
    console.log("cjecl search friend", searchFriends);
    if (user) {
      console.log("this user id", user.uid);
      axios({
        method: "GET",
        url: `http://localhost:3001/get-friends/${user.uid}`,
      })
        .then((res) => {
          console.log("Friends are ", res.data);
          setUserFriends(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    user?.uid &&
    (userFriends ? (
      <div className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 max-h-screen mt-10 flex justify-center">
        {userFriends.map((friend) => (
          <div className="flex items-center justify-center" key={friend?.id}>
            <Cards friend={friend} />
          </div>
        ))}
      </div>
    ) : null)
  );

  //   return (
  //     user?.uid && (
        // <div className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 max-h-screen mt-10 flex justify-center">
  //         {searchFriends ? (
  //           searchFriends.map((friend) => {
  //             return <AddCard friendDetails={friend} />;
  //           })
  //         ) : userFriends ? (
  //           <div className="grid grid-cols-3 gap-10">
  //             {userFriends.map((friend) => (
  //               <div
  //                 className="flex items-center justify-center"
  //                 key={friend?.id}
  //               >
  //                 <Cards friend={friend} />
  //               </div>
  //             ))}
  //           </div>
  //         ) : !searchFriends && searchTerm !== "" ? (
  //           <div> No Friends found in your list. Press Search </div>
  //         ) : (
  //           <div className="text-2xl text-center">
  //             You have got no friends yet..! Please search for new friends.
  //           </div>
  //         )}
  //       </div>
  //     )
  //   );
};

export default ChatBody;
