const isOwner = (interaction, data, value) => {
    let checker = false
    for (let i = 0; i < data.teams.length; i++) {
        //Checks if a player is an owner of a team
        if (data.teams[i].nome === value || data.teams[i].captain === `${interaction.member.user.tag}`) {
            checker = true;
            break;
        }
    }
    return checker
}
const isConfirmed = (data, value) => {
    let checker = false
    for (let i = 0; i < data.teams.length; i++) {
        //Checks if the player is already confirmed on a team ( confirming system under construction)
        for (let j = 0; j < data.teams[i].integrantes.length; j++) {
            if (data.teams[i].integrantes[j].status === "CONFIRMED" && data.teams[i].integrantes[j].nick === value) {
                checker = true
                break;
            }
        }
    }
    return checker
}
const isOnTeam = (data, user) => {
    let checker = false
    for (let i = 0; i < data.teams.length; i++) {
        //Checks if the invited player is an onwer of a team
        if (data.teams[i].captain === `${user.username}#${user.discriminator}`) {
            for (let j = 0; j < data.teams[i].integrantes.length; j++) {
                //Checks if he is already invited or confirmed on the same team
                if (data.teams[i].integrantes[j].nick === `${user.username}#${user.discriminator}` && data.teams[i].integrantes[j].status === "CONFIRMED") {
                    checker = true
                    break;
                }
            }
            checker = true
            break;
        }
    }
    return checker
}
const isSelfInviting = (data, user) => {
    let checker = false
    for (let i = 0; i < data.teams.length; i++) {
        for (let j = 0; j < data.teams[i].integrantes.length; j++) {
            //Checks if the player inviting is inviting himself
            if (data.teams[i].integrantes[j].nick === `${user.username}#${user.discriminator}` || data.teams[i].captain === `${user.username}#${user.discriminator}`) {
                checker = true
                break;
            }
        }
    }
    return checker
}

module.exports = {
    isOwner, isConfirmed, isOnTeam, isSelfInviting
}