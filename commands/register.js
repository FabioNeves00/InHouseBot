const { SlashCommandBuilder } = require("@discordjs/builders");
const { isUser, isValidEmail } = require("../auths.js");
const { MessageEmbed } = require("discord.js");
const User = require("../models/User");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("registra voce como um usuario na database")
    .addStringOption((Option) =>
      Option.setName("nome")
        .setDescription("seu nome completo")
        .setRequired(true)
    )
    .addStringOption((Option) =>
      Option.setName("matricula")
        .setDescription("sua matricula do cesupa")
        .setRequired(true)
    )
    .addStringOption((Option) =>
      Option.setName("email")
        .setDescription("seu email do cesupa")
        .setRequired(true)
    ),
  async execute(interaction) {
    //matricula
    const matricula = interaction.options.data[1].value;
    const nome = interaction.options.data[0].value;
    const email = interaction.options.data[2].value;
    if (!(await isUser(matricula))) {

        console.log(isValidEmail(email))
      //creates new team
      const user = new User({
        nome: nome,
        discordTag: interaction.member.user.tag,
        matricula: matricula,
        email: email
      });

      //saves user to database
      await user.save();
      //replies to the message

      const teamMsg = new MessageEmbed()
        .setTitle(
          `Successfully registered ${interaction.member.user.tag} to database`
        )
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .setTimestamp();
      interaction.reply({ embeds: [teamMsg] });
    } else if(!isValidEmail()){
        const errEmail = new MessageEmbed()
        .setTitle(`Error`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .addField(
          "Failed to register user",
          `${email} is not a valid email`
        )
        interaction.reply({ embeds: [errEmail] });
    }
    else {
      const err1 = new MessageEmbed()
        .setTitle(`Error`)
        .setThumbnail(`${interaction.member.user.avatarURL()}`)
        .addField(
          "Failed to register user",
          `${interaction.member.user.tag} already exists in the database`
        )
        .setTimestamp();

      interaction.reply({ embeds: [err1] });
    }
  },
};
