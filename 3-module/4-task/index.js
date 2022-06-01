function showSalary(users, age) {
  let finalString = ''

  users.forEach(user => {
    if (user.age <= age) {
      finalString += user.name + ', ' + user.balance + '\n'
    }
  });

  return finalString.trim()
}
