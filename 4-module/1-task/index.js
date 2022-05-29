function makeFriendsList(friends) {
  let list = document.createElement("ul")

  friends.forEach(friend => {
    list.innerHTML += '<li>' + friend.firstName + ' ' + friend.lastName + '</li>'
  });

  return list

}
