function namify(users) {
  let names = []
  
  users.forEach(user => {
    names.push(user.name)
  });

  return names
}
