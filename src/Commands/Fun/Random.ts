import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import config from '../../config.json'
import { IDefaultVariables } from '../../Helpers/CommandHelper'
import { ResponseHelper, ResponseTypes } from '../../Helpers/ResponseHelper'
import { Logger } from '../../Logging/Logger'
import { LogTypes } from '../../Logging/LogTypes'
import { Emotes } from '../../Utility/Emotes'
import { Animals, RandomAnimalApi } from '../../Utility/RandomAnimalApi'

export class RandomCommand {
  public static getData(t: Function): RESTPostAPIApplicationCommandsJSONBody {
    return new SlashCommandBuilder()
      .setName(t('command_random_name'))
      .setDescription(
        `[${t('command_category_fun')}] ${t('command_random_info')}`
      )
      .addStringOption((option) => {
        return option
          .setName(t('command_random_option_animal_name'))
          .setDescription(t('command_random_option_animal_info'))
          .setRequired(true)
          .setChoices(
            {
              name: t('command_random_option_animal_choice_bird'),
              value: 'bird',
            },
            {
              name: t('command_random_option_animal_choice_bunny'),
              value: 'bunny',
            },
            {
              name: t('command_random_option_animal_choice_cat'),
              value: 'cat',
            },
            {
              name: t('command_random_option_animal_choice_dog'),
              value: 'dog',
            },
            {
              name: t('command_random_option_animal_choice_duck'),
              value: 'duck',
            },
            {
              name: t('command_random_option_animal_choice_fox'),
              value: 'fox',
            },
            {
              name: t('command_random_option_animal_choice_kangaroo'),
              value: 'kangaroo',
            },
            {
              name: t('command_random_option_animal_choice_koala'),
              value: 'koala',
            },
            {
              name: t('command_random_option_animal_choice_lizard'),
              value: 'lizard',
            },
            {
              name: t('command_random_option_animal_choice_panda'),
              value: 'panda',
            },
            {
              name: t('command_random_option_animal_choice_racoon'),
              value: 'racoon',
            },
            {
              name: t('command_random_option_animal_choice_redPanda'),
              value: 'red_panda',
            },
            {
              name: t('command_random_option_animal_choice_shiba'),
              value: 'shiba',
            },
            {
              name: t('command_random_option_animal_choice_sloth'),
              value: 'sloth',
            }
          )
      })
      .toJSON()
  }

  public static async execute(
    interaction: CommandInteraction,
    defaultVariables: IDefaultVariables
  ): Promise<void> {
    const { myUser, t, send } = defaultVariables

    const animal = interaction.options.getString(
      t('command_random_option_animal_name')
    )

    if (
      typeof animal !== 'string' ||
      !(Object.values(Animals) as string[]).includes(animal)
    ) {
      const errorEmbed = await ResponseHelper.getEmbed(
        ResponseTypes.ERROR,
        myUser,
        t('error_generic', { inviteLink: config.linkSupportServer })
      )

      await send({
        ephemeral: true,
        embeds: [errorEmbed],
      })

      Logger.log(
        LogTypes.ERROR,
        1653754210,
        'Random command has been provided with invalid option: ' + animal
      )
      return
    }

    let animalData

    try {
      await interaction.deferReply()
      animalData = await RandomAnimalApi.get(animal as Animals)
    } catch (error) {
      const errorEmbed = await ResponseHelper.getEmbed(
        ResponseTypes.ERROR,
        myUser,
        t('random_imageNotFound', { inviteLink: config.linkSupportServer })
      )

      await send({
        embeds: [errorEmbed],
      })

      Logger.log(
        LogTypes.ERROR,
        1653754291,
        animal + ' api returned an invalid link.'
      )

      return
    }

    const embed = new MessageEmbed()
      .setColor(await myUser.getColor())
      .setImage(animalData.url)
      .setFooter({
        text: t('random_credits', { apiLink: animalData.credits }),
        iconURL: (await Emotes.get('servantLove'))?.url ?? undefined,
      })

    await send({
      embeds: [embed],
    })
  }
}
