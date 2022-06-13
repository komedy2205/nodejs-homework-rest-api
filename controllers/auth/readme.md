другой вариант добавления пароля в базу

const newUser = new User({ email });
newUser.setPassword(password);
newUser.save();

другой вариант проверки пароля в базе у пользователя

if (!user || !user.comparePassword(password)) {
throw new Unauthorized("Email or password is wrong");
}
