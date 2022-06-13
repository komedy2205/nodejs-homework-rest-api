другой вариант проверки добавления пароля в базу

userSchema.methods.setPassword = function (password) {
this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

другой вариант проверки наличия пароля в базе у пользователя

userSchema.methods.comparePassword = function (password) {
return bcrypt.compareSync(password, thipassword);
}
